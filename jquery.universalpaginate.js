/*
 * jQuery Universal Paginate
 * version: 2.1.0 (2010-02-15)
 * @requires jQuery v1.4.2 or later
 * @requires jQuery Templates
 *
 * Examples and documentation at: http://blog.pierrejeanparra.com/jquery-plugins/universal-paginate/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function ($) {
	
	var methods  = {
		init: function (options) {
			var params,
				defaults = {
					nbItemsByPage: 10,
					nbPagesDisplayed: 10,
					itemTemplate: '<li>${value}</li>',
					dataUrl: null,
					nbPreloadedPages: 2,
					refreshInterval: null,
					universalPaginateClass: 'universal_paginate',
					controlsPosition: 'top',
					paginationNavigationArrows: true,
					allowItemsByPageChange: true,
					displayItemsByPageSelector: true,
					itemsByPageText: 'Items by page',
					pageText: 'Page',
					nbItemsByPageOptions: [5, 10, 15, 20, 30, 60, 100],
					headerElement: null,
					noDataText: '<div>No data to display</div>',
					ajaxOptions: {},
					onDataUpdate: function (data) {}
				};
			
			params = $.extend(defaults, options || {});
			
			return this.each(function () {
				var $list = $(this),
					$pagesList = $('<div class="' + params.universalPaginateClass + '_pages"></div>'),
					$header,
					defaultAjaxOptions;
					
				// Store parameters to make them available anywhere
				$list.data('universal_paginate', {'params': params});

				// Create the item template
				$list.universalPaginate('changeItemTemplate', params.itemTemplate);

				// Create the header
				if (params.headerElement) {
					$header = $(params.headerElement);
				} else {
					$header = $('<div class="' + params.universalPaginateClass + '_header"><div class="clear"></div></div>');
					if (params.controlsPosition === 'top') {
						$list.before($header);
					} else {
						$list.after($header);
					}
				}
				$header.prepend($pagesList);
				$list.data('universal_paginate').header = $header;
				
				// Allow changing the number of items by page
				if (params.allowItemsByPageChange === true) {
					privateMethods.allowChangingItemsByPage($list, $header);
				}
				if (params.displayItemsByPageSelector === true) {
					privateMethods.displayItemsByPageSelector($list, $header);
				}
				
				// Bind the pagination links
				$pagesList.delegate('.' + params.universalPaginateClass + '_link', 'click', function () {
					$list.universalPaginate('goToPage', $(this).data('universal_paginate').page_id);
					return false;
				});
				
				// Init the refresh cycle, if needed
				if (params.refreshInterval) {
					privateMethods.initRefreshTimer($list, params.refreshInterval);
				}
				
				// Bind custom event to allow on-demand data refreshing
				$list.bind('refresh.' + params.universalPaginateClass, function (ev, data) {
					$list.data('universal_paginate').additionalData = data;
					methods.refresh();
				});
				$list.bind('full_refresh.' + params.universalPaginateClass, function (ev, data) {
					$list.data('universal_paginate').additionalData = data;
					methods.refresh(true);
				});
				
				defaultAjaxOptions = {
					url: params.dataUrl, 
					data: {
						startIndex: 0,
						nbItemsByPage: params.nbItemsByPage,
						nbPreloadedPages: 0
					}, 
					dataType: 'json',
					type: 'get', 
					cache: false, 
					success: function (serverData) {
						$list.data('universal_paginate').serverData = serverData;
						
						$list.data('universal_paginate').currentPage = 1;
						// Generate the first page
						$list.universalPaginate('goToPage', 1);
					}
				};
				
				// Get the first set of data (we just fetch one page. Other pages will be pre-loaded later in background
				$list.data('universal_paginate').xhr = $.ajax($.extend(defaultAjaxOptions, params.ajaxOptions || {}));
			});
		},
		
		// Changes the template used to display the data
		changeItemTemplate: function (newItemTemplate) {
			return this.each(function () {
				var $list = $(this),
					itemTemplate;
				
				// If the template is given as a string
				if (typeof newItemTemplate === 'string') {
					itemTemplate = $.template(newItemTemplate);
				} else {
					// Assume it is a jQuery object
					itemTemplate = $(newItemTemplate).template();
				}
				
				$list.data('universal_paginate').itemTemplate = itemTemplate;
			});
		},
		
		// Changes the current page to pageId
		goToPage: function (pageId) {
			return this.each(function () {
				var $list = $(this),
					data = $list.data('universal_paginate').additionalData || {},
					params = $list.data('universal_paginate').params,
					serverData = $list.data('universal_paginate').serverData,
					// This index is the current page number amongst the pre-loaded pages
					currentPage = $list.data('universal_paginate').currentPage,
					locallyStoredData = serverData.data[pageId - currentPage]?true:false,
					defaultAjaxOptions,
					nbPages = Math.ceil(serverData.nbTotalItems / serverData.nbItemsByPage);
				
				// If we already have the data, just populate the list right now.
				// We will update our local data later
				if (locallyStoredData) {
					privateMethods.populateList($list, serverData, pageId);
				}
				
				// Whether we have the data locally or not, we still have to update the pagination
				privateMethods.createPagination($list, $('.' + params.universalPaginateClass + '_pages', $list.data('universal_paginate').header), nbPages, pageId);
				
				data.startIndex = (pageId - 1) * params.nbItemsByPage;
				data.nbItemsByPage = params.nbItemsByPage;
				data.nbPreloadedPages = params.nbPreloadedPages;
				
				defaultAjaxOptions = {
					url: params.dataUrl, 
					data: data, 
					dataType: 'json',
					type: 'get', 
					cache: false, 
					success: function (serverData) {
						var pageId = Math.ceil(serverData.startIndex / serverData.nbItemsByPage) + 1,
							nbPages = Math.ceil(serverData.nbTotalItems / serverData.nbItemsByPage);
							
						// As we are going to get fresh data, let's update current page number (this index is the current page number amongst the pre-loaded pages)
						$list.data('universal_paginate').currentPage = pageId;
					
						// If we didn't have the data when we were asked to change page, we had to wait for the data to be fetched from the server, which is now. 
						// So let's populate the list with fresh data.
						if (!locallyStoredData) {
							privateMethods.populateList($list, serverData, pageId);
						}
						
						// In all cases, we want to update the pagination links
						// If we don't do this, we may risk to have unconsistent pagination in some cases
						privateMethods.createPagination($list, $('.' + params.universalPaginateClass + '_pages', $list.data('universal_paginate').header), nbPages, pageId);
						
						// Update local data
						$list.data('universal_paginate').serverData = serverData;
						
						params.onDataUpdate(serverData);
					}
				};
				
				// Cancel any other Ajax request
				$list.data('universal_paginate').xhr.abort();
				
				// Let's update local data
				$list.data('universal_paginate').xhr = $.ajax($.extend(defaultAjaxOptions, params.ajaxOptions || {}));
			});
		},
		
		// Refreshes list data
		refresh: function (opts) {
			var options = opts || {};
			return this.each(function () {
				var $list = $(this),
					newPageIndex = $list.data('universal_paginate').currentPage;
				
				if (options.reInit) {
					newPageIndex = 1;
				}
				if (options.data) {
					$list.data('universal_paginate').additionalData = options.data;
				}
				
				// Empty cache
				$list.data('universal_paginate').serverData.data = {};
				
				$list.universalPaginate('goToPage', newPageIndex);
			});
		}
	},
	
	privateMethods = {
		// Creates pagination links
		createPagination: function ($list, $pagesList, nbPages, pageId) {
			var prevPageId = pageId - 1,
				nextPageId = pageId + 1,
				i,
				params = $list.data('universal_paginate').params,
				$link;
			
			$pagesList.empty();
			for (i = 1; i <= nbPages; i += 1) {
				if ((i === 1 || i === nbPages) || (nbPages > params.nbPagesDisplayed && i > pageId - 3 && i < pageId + 3) || nbPages <= params.nbPagesDisplayed) {
					$link = $('<a href="#" class="' + params.universalPaginateClass + '_link ' + params.universalPaginateClass + '_page_' + i + (i === pageId ? ' active' : '') + '">' + i + '</a>');
					$link.data('universal_paginate', {'page_id': i});
					$pagesList
						.append($link);
				} else if (nbPages > params.nbPagesDisplayed && (i === pageId - 3 || i === pageId + 3)) {
					$pagesList
						.append('<span class="' + params.universalPaginateClass + '_dots">...</span>');
				}
			}
			
			// Add the navigation arrows if needed
			if (params.paginationNavigationArrows === true) {
				if (prevPageId >= 1) {
					$link = $('<a href="#" class="' + params.universalPaginateClass + '_link ' + params.universalPaginateClass + '_page_' + prevPageId + '">&lt;</a>');
					$link.data('universal_paginate', {'page_id': prevPageId});
					$pagesList.prepend($link);
				}
				if (nextPageId <= nbPages) {
					$link = $('<a href="#" class="' + params.universalPaginateClass + '_link ' + params.universalPaginateClass + '_page_' + nextPageId + '">&gt;</a>');
					$link.data('universal_paginate', {'page_id': nextPageId});
					$pagesList.append($link);
				}
			}
			
			// Add the "page" text
			$pagesList.prepend(params.pageText);
		},
		
		// Allows changing the number of items by page
		allowChangingItemsByPage: function ($list, $header) {
			var params = $list.data('universal_paginate').params;
			$header.delegate('.' + params.universalPaginateClass + '_nb_items_by_page_selector', 'change', function () {
				$list.data('universal_paginate').params.nbItemsByPage = $(this).val();
				$list.universalPaginate('refresh', {reInit: true});
			});
		},
		
		// Displays the number of items by page selector
		displayItemsByPageSelector: function ($list, $header) {
			var $select = $('<select>'),
				$wrapper = $('<div>'),
				params = $list.data('universal_paginate').params;
			
			$.each(params.nbItemsByPageOptions, function (i, val) {
				$select.append($('<option>', {
					value: val,
					text: val,
					selected: val === params.nbItemsByPage
				}));
			});
			
			$select.addClass(params.universalPaginateClass + '_nb_items_by_page_selector');
			
			$wrapper.addClass(params.universalPaginateClass + '_nb_items_by_page').append(params.itemsByPageText).append($select);
			
			// Create the pagination zone
			$header.prepend($wrapper);
		},
		
		// Inits the refresh cycle
		initRefreshTimer: function ($list, interval) {
			var refreshTimer = $list.data('universal_paginate').refreshTimer;
			if (refreshTimer) {
				clearInterval(refreshTimer);
			}
			if (interval > 0) {
				refreshTimer = setInterval(function () {
					$list.universalPaginate('refresh');
				}, interval);
			}
		},
		
		// Populates the list with provided data
		populateList: function ($list, serverData, pageId) {
			var params = $list.data('universal_paginate').params,
				currentPage = $list.data('universal_paginate').currentPage;
			
			if (serverData.nbTotalItems === 0) {
				$list.empty().append(params.noDataText);
			} else {
				// Create content
				$.tmpl($list.data('universal_paginate').itemTemplate, serverData.data[pageId - currentPage]).appendTo($list.empty());
			}
		}
	};
	
	$.fn.universalPaginate = function (method) {
		if (!this.length) {
			return this;
		}
		
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.universalPaginate');
		}
	};

})(jQuery);