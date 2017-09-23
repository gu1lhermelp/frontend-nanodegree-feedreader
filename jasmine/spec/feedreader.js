/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test of URL is defined and is not empty */
         it('url are defined and not empty', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url).not.toBe('');
           }
         });


        /* Test if feed name is defined and isn't empty */
         it('names are defined and not empty', function() {
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name).not.toBe('');
           }
         });
    });


    /* This test suit test the menu hidden options */
    describe('The menu', function() {

        /* Test if the menu is hidden by default */
         it('is hidden by default', function() {
          expect($("body").hasClass("menu-hidden")).toBeTruthy();
         });

         /* Test if the menu is shows when we clickt and wether it hides when
         ** we click on it one more time.
         */
          it('is show and hidden when clicked', function() {
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBeFalsy();
            $(".icon-list").click();
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
          });
  });
    /* Test async function loadFeed" */
    describe('Initial entries', function() {

         beforeEach(function(done) {
          loadFeed(0, done);
         });

        /* Test if loadFeed actually load something."""
         */
         it('loaded', function(done) {
           expect($('.feed .entry').length).toBeGreaterThan(0);
           done();
         });
    });

    /* The async loadFeed called to load new content */
    describe('New feed selection', function() {
        var content;

         beforeEach(function(done) {
           loadFeed(0, function() {
             content = $('.feed').html();
             loadFeed(1, function() {
               done();
             });
           });
         });

        /* Test if loadFeed changes the content when called with new feed.
         */
         it('changes content', function(done) {
           expect($(".feed").html()).not.toBe(content);
           done();
         });
    });
}());
