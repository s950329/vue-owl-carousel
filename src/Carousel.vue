<template>
  <div>
    <span v-show="showPrev"
          :id="prevHandler">
      <slot name="prev" />
    </span>
    <div :id="elementHandle"
         :class="['owl-carousel', 'owl-theme']">
      <slot />
    </div>
    <span v-show="showNext"
          :id="nextHandler">
      <slot name="next" />
    </span>
  </div>
</template>
<script>
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

import events from './utils/events';

export default {
  name: 'VOwlCarousel',
  props: {
    items: {
      type: Number,
      default: 3,
    },
    margin: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    nav: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    autoplaySpeed: {
      type: Boolean,
      default: false,
    },
    rewind: {
      type: Boolean,
      default: true,
    },
    mouseDrag: {
      type: Boolean,
      default: true,
    },
    touchDrag: {
      type: Boolean,
      default: true,
    },
    pullDrag: {
      type: Boolean,
      default: true,
    },
    freeDrag: {
      type: Boolean,
      default: false,
    },
    stagePadding: {
      type: Number,
      default: 0,
    },
    autoWidth: {
      type: Boolean,
      default: false,
    },
    autoHeight: {
      type: Boolean,
      default: false,
    },
    dots: {
      type: Boolean,
      default: true,
    },
    autoplayTimeout: {
      type: Number,
      default: 5000,
    },
    autoplayHoverPause: {
      type: Boolean,
      default: false,
    },
    responsive: {
      type: Object,
      default: () => {},
    },
  },
  data: function() {
    return {
      showPrev: false,
      showNext: true,

      prevHandler: 'carousel_prev_' + this.generateUniqueId(),
      elementHandle: 'carousel_' + this.generateUniqueId(),
      nextHandler: 'carousel_next_' + this.generateUniqueId(),
    };
  },

  mounted: function() {
    const owl = $('#' + this.elementHandle).owlCarousel({
      items: this.items,
      margin: this.margin,
      loop: this.loop,
      center: this.center,
      nav: this.nav,
      autoplay: this.autoplay,
      autoplaySpeed: this.autoplaySpeed,
      rewind: this.rewind,
      mouseDrag: this.mouseDrag,
      touchDrag: this.touchDrag,
      pullDrag: this.pullDrag,
      freeDrag: this.freeDrag,
      stagePadding: this.stagePadding,
      autoWidth: this.autoWidth,
      autoHeight: this.autoHeight,
      dots: this.dots,
      autoplayTimeout: this.autoplayTimeout,
      autoplayHoverPause: this.autoplayHoverPause,
      responsive: this.responsive,
    });

    $('#' + this.prevHandler).click(function() {
      owl.trigger('prev.owl.carousel');
    });

    $('#' + this.nextHandler).click(function() {
      owl.trigger('next.owl.carousel');
    });

    events.forEach((eventName) => {
      owl.on(`${eventName}.owl.carousel`, (event) => {
        this.$emit(eventName, event);
      });
    });

    if (!this.loop) {
      owl.on('changed.owl.carousel', (event) => {
        // start
        if (event.item.index === 0) {
          this.showPrev = false;
          this.showNext = true;
        } else {
          const currnetel = Math.floor(event.item.index + event.page.size);
          // last
          if (currnetel === event.item.count) {
            this.showPrev = true;
            this.showNext = false;
          } else {
            this.showPrev = true;
            this.showNext = true;
          }
        }
      });
    }
  },

  methods: {
    generateUniqueId() {
      return Math.random().toString(36).substring(2, 15);
    },
  },
};

</script>
