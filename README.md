# Some context

Ever wanted to paginate some long list of items? Probably. You probably found some jQuery plugins out there that did the trick. But. But there was always something you didn't like about it. Most certainly it was the fact that you had to change your HTML markup to fit the plugin expected syntax. You probably had to transform your nice, lightweight, semantic list into a less convenient list, or even into a table.

What I propose through Universal Paginate is a template-based pagination system. Whatever you want to paginate, it works. A simple <ul> list, a more complicated <dl> list, table rows... Universal Paginate simply doesn't care. Oh, and it supports natively remote data sources. Just give the URL to fetch data from, and it will take care of the rest. It renders your data with the given template and paginate it, simply.

You will notice some nice other features, like page pre-loading, automatic clipping of long page links list and periodic refresh, among others.

Since version 2.0, you can also interact with this plugin programmatically, go to a specific page or changing the template used to render an item.

All of this in only 336 lines of nice, readable, finely commented jQuery code and the use of the now official jQuery Templates plugin, which ensures durability and extensibility.

# Usage

## JS

The jQuery object to which you apply the plugin will be the trigger of the confirmation box. This trigger will be passed along in the parameters for the callback functions.

    $('#try').fastConfirm(options);

What else?
You can also call methods, the jQueryUI way:

    $('#try').fastConfirm('close');

## HTML

Just any valid HTML element:

    <button id="try">Try it!</button>

##CSS

A CSS file is included in the downloadable package. But you might want to add some custom CSS to make the integration more seamless.

You'll see in the included CSS file that there are two sections, the first one shouldn't be edited, it is a part of the plugin behaviour, and the second part contains what is relative to the look & feel, so you can customize it (if you want a red background for your confirmation box for example).

## Options

There are a few options to make Fast Confirm more flexible. Here they are, with their default values:

    position: ['top', 'right', 'bottom', 'left']
    Defines where to put the confirmation box, realtively to the trigger element.
    offset: {top: 0, left: 0}
    Allows precise positioning. Top and left offsets will be added to the computed default absolute position of the confirmation box. If you set the top offset to -5 for example, the confirmation box will be 5 pixels above its default position.
    zIndex: 10000
    Allows you to fine tune the z-index if you're facing z-index issues causing the confirm box not to appear
    eventToBind: [eventName, false]
    An event name (submit, click...) or false. If an event name is provided, Fast Confirm will take care of event management. This is really useful when you want to deal with form submission.
    questionText: "Are you sure?"
    The question asked by the confirm box.
    proceedText: "Yes"
    The text of the button designated to confirm the action
    cancelText: "No"
    The text of the button designated to cancelthe action
    targetElement: null
    A selector to specify on which element, inside the binded element, the confirm box should be opened. Mostly useful to open the box on the submit button of a form.
    unique: [true, false]
    If set to true, only one confirm box can remain opened. Any new confirm box will close opened boxes, triggering the "cancel" action on each one.

    fastConfirmClass: 'fast_confirm'
    The CSS class prefix used in all Fast Confirm elements. If you want to change classes names for any reason, you have to use this parameter
    onProceed: function(trigger, clicked) {$.fastConfirm.close(trigger);}
    The function called when the user hits the confirmation button
    onCancel: function(trigger, clicked) {$.fastConfirm.close(trigger);}
    The function called when the user hits the cancellation button