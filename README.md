#Some context

Ever wanted to paginate some long list of items? Probably. You probably found some jQuery plugins out there that did the trick. But. But there was always something you didn't like about it. Most certainly it was the fact that you had to change your HTML markup to fit the plugin expected syntax. You probably had to transform your nice, lightweight, semantic list into a less convenient list, or even into a table.

What I propose through Universal Paginate is a template-based pagination system. Whatever you want to paginate, it works. A simple <ul> list, a more complicated <dl> list, table rows... Universal Paginate simply doesn't care. Oh, and it supports natively remote data sources. Just give the URL to fetch data from, and it will take care of the rest. It renders your data with the given template and paginate it, simply.

You will notice some nice other features, like page pre-loading, automatic clipping of long page links list and periodic refresh, among others.

Since version 2.0, you can also interact with this plugin programmatically, go to a specific page or changing the template used to render an item.

All of this in only 336 lines of nice, readable, finely commented jQuery code and the use of the now official jQuery Templates plugin, which ensures durability and extensibility.

#Usage

##JS

To create a paginated list, just do the following:

    $('.my_list').universalPaginate(options);

You can also call some methods using the following syntax:

    $('.my_list').universalPaginate('methodName', options);

##HTML

Just any container that will receive your items. That includes div, ul, dl, table... Just anything!

##CSS

A default CSS is given to make it a bit easier on the eyes, but there's no magic, if you want to integrate it nicely, you will probably have to customize it a little.

##JSON

Universal Paginate expects your server to send him some JSON formatted data. You probably wonder what your server-side script should return. You will find a helper class in the package which will take care of this formatting for you. You can use it as provided or copy-paste the code bits you are interested in.
The JSON output should look like this (assuming that you requested items starting at index 20, with 10 items by page):

    {
    "startIndex": "20",
    "nbItemsByPage": "5",
    "nbTotalItems": "145",
    "data": [
    {"id":"first object id","other_property":"other value"},
    {"id":"second object id","other_property":"other value"},
    {"id":"third object id","other_property":"other value"},
    {"id":"fourth object id","other_property":"other value"},
    {"id":"fifth object id","other_property":"other value"},
    ]
    } 

The nbTotalItems is the total number of items in your data set (not restricted to the page you requested). It is used to produce the pagination links, amongst others.

##Options

The plugin provides several options so that you can make it work the way you want. Here there are:

    nbItemsByPage: 10
    The number of items by page
    nbPagesDisplayed: 10
    The number of page links to display before the clipping occurs
    itemTemplate: '<li>${value}</li>'
    Probably the most important part, this is the template for your items. It supports the jQuery Templates plugin syntax
    dataUrl: null
    The URL to fetch the data from
    nbPreloadedPages: 2
    The number of pages to pre-load, before and after the current page. For instance, with the default value (2) loading page 4 will also load pages 2, 3, 5 and 6. A great speed improvement can be achieved.
    refreshInterval: null
    In milliseconds, the time elapsed between two data refreshes. null means no refresh at all.
    universalPaginateClass: 'universal_paginate'
    The default prefix for Universal Paginate specific classes and other things
    controlsPosition: ['top', 'bottom']
    The position where the controls (number of items by page and page links) will be appended. Top or bottom of the list
    paginationNavigationArrows: [true, false]
    Whether or not to display "prev" and "next" arrows for page navigation
    allowItemsByPageChange: [true, false]
    Whether to give the user or not the ability to change the number of items to display on each page
    displayItemsByPageSelector: [true, false]
    Whether to display or not a selector to allow the user to change the number of items by page
    itemsByPageText: 'Items by page'
    The default text displayed in front of the items by page selector
    pageText: 'Page'
    The default text displayed in front of the page links list
    nbItemsByPageOptions: [5, 10, 15, 20, 30, 60, 100]
    The possible options given to the user to customize the number of items displayed by page
    headerElement: null
    If you want to append the controls (page links and number of items by page) to an existent element, just give a selector, DOM element or jQuery object of this element
    noDataText: '<div>No data to display</div>'
    The text to display when there is no data to display
    ajaxOptions: {}
    Some options that will be used in the get or post request when querying the server for data. The hash is the same as the one you would use with $.ajax() or $.ajaxSetup(). It will override the defaults that UP uses in the ajax requests. Allows, among others, to switch from get to post request.
    onDataUpdate: function(data) {}
    This callback is triggered every time the plugin has fetched new data from the data source. The data is passed as a parameter

