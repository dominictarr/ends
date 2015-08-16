# ends

this is a really simple infinite scroll proof of concept.

will be refactored into a module soon!

## how it works.

The user provides a `list`, a `header` and a `footer`.
The user may position these elements on the page themselves.
the scroller will request new elements from either the start
or end of the list depending on wether the header or footer is
currently on screen.

If you scroll to the middle of the list, no new elements would be added.

Also, either end can be "sticky" -- this is about how adding elements
affects scrolling. If the head is sticky, and you are scrolled to the top,
new elements are added and you scroll up to the same position relative
to the header, if the head is not sticky,
then you stay in the same position relative to the elements which you
where probably trying to look at ;) which is less annoying.

one example of a situation where you might want stickyness is logging.
if a program is outputting data, you may want to monitor that as it
goes past. but then if you scroll up to look at something in detail,
you don't want the screen to scroll to the bottom because something
new has been added.



## License

MIT
