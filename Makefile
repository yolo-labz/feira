# Asset generation. Everything here is reproducible from versioned source —
# nothing in docs/assets/rendered/ is hand-edited.
#
#   make assets        regenerate every rendered asset
#   make demo          re-record the terminal demo (slow; changes dates)
#   make check         run the whole verification suite
#
# Needs: python3 (stdlib only). For `assets`: inkscape, imagemagick.
# For `demo`: asciinema + agg — available on nix without installing anything:
#   nix-shell -p asciinema asciinema-agg --run 'make demo'

SOURCE   := docs/assets/source
RENDERED := docs/assets/rendered

.PHONY: all assets demo check check-assets test clean help

help:
	@echo 'make assets   regenerate rendered images from source'
	@echo 'make demo     re-record the terminal cast and GIF'
	@echo 'make check    tests + asset checks'

all: assets

assets: $(RENDERED)/social-preview.png $(RENDERED)/demo.gif $(RENDERED)/demo.png

# Text is flattened to paths (-T) so the card renders identically on a machine
# that has none of the fonts named in the SVG.
$(RENDERED)/social-preview.png: $(SOURCE)/social-preview.svg
	@mkdir -p $(RENDERED)
	inkscape $< --export-type=png --export-filename=$@ -w 1280 -h 640 -T
	@echo "  $@ -> $$(identify -format '%wx%h %b' $@)"

# The GIF is rendered from the cast, and the cast is only re-recorded by
# `make demo` — so `make assets` is fast and does not churn the recording.
$(RENDERED)/demo.gif: $(SOURCE)/demo.cast
	@mkdir -p $(RENDERED)
	agg --font-size 15 --line-height 1.35 --theme github-light --speed 1.4 \
	    --idle-time-limit 0.7 --last-frame-duration 4 $< $@
	@echo "  $@ -> $$(identify -format '%wx%h %n frames %b' $@ | head -1)"

# Static fallback: the final frame, for anyone who cannot see the animation.
$(RENDERED)/demo.png: $(RENDERED)/demo.gif
	magick $< -coalesce -delete 0--2 $@

# 100 columns because the widest line feira prints is 96; at 80 it wraps and the
# table becomes unreadable. asciinema 3 needs --window-size, not --cols.
demo:
	FEIRA="$$PWD/bin/feira" asciinema rec --window-size 100x30 --overwrite \
	  -c "sh $(SOURCE)/demo.sh" $(SOURCE)/demo.cast
	$(MAKE) $(RENDERED)/demo.gif $(RENDERED)/demo.png

check: test check-assets

test:
	sh tests/run.sh

check-assets:
	python3 scripts/check-assets.py

clean:
	rm -f $(RENDERED)/*.png $(RENDERED)/*.gif
