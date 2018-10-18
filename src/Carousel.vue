<template>
  <div>
    <span v-show="showPrev" :id="prevHandler">
      <slot name="prev" />
    </span>
    <div :id="elementHandle" :class="['owl-carousel', 'owl-theme']">
      <slot />
    </div>
    <span v-show="showNext" :id="nextHandler">
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
    merge: {
      type: Boolean,
      default: false,
    },
    mergeFit: {
      type: Boolean,
      default: false,
    },
    autoWidth: {
      type: Boolean,
      default: false,
    },
    startPosition: {
      type: Number,
      default: 0,
    },
    uRLhashListener: {
      type: Boolean,
      default: false,
    },
    nav: {
      type: Boolean,
      default: true,
    },
    rewind: {
      type: Boolean,
      default: true,
    },
    navText: {
      type: Array,
      default: () => ['next', 'prev'],
    },
    navElement: {
      type: String,
      default: 'div',
    },
    slideBy: {
      type: [Number, String],
      default: 1,
    },
    slideTransition: {
      type: String,
      default: '',
    },
    dots: {
      type: Boolean,
      default: true,
    },
    dotsEach: {
      type: [Number, Boolean],
      default: false,
    },
    dotsData: {
      type: Boolean,
      default: false,
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    lazyLoadEager: {
      type: Number,
      default: 0,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    autoplaySpeed: {
      type: Boolean,
      default: false,
    },
    autoplayTimeout: {
      type: Number,
      default: 5000,
    },
    autoplayHoverPause: {
      type: Boolean,
      default: false,
    },
    smartSpeed: {
      type: Number,
      default: 250,
    },
    fluidSpeed: {
      type: [Number, Boolean],
      default: false,
    },
    navSpeed: {
      type: [Number, Boolean],
      default: false,
    },
    dragEndSpeed: {
      type: [Number, Boolean],
      default: false,
    },
    callbacks: {
      type: Boolean,
      default: true,
    },
    responsive: {
      type: Object,
      default: () => {},
    },
    responsiveRefreshRate: {
      type: Number,
      default: 200,
    },
    video: {
      type: Boolean,
      default: false,
    },
    videoHeight: {
      type: [Number, Boolean],
      default: false,
    },
    videoWidth: {
      type: [Number, Boolean],
      default: false,
    },
    animateOut: {
      type: [String, Boolean],
      default: false,
    },
    animateIn: {
      type: [String, Boolean],
      default: false,
    },
    fallbackEasing: {
      type: String,
      default: 'swing',
    },
    info: {
      type: Function,
      default: () => {},
    },
    itemElement: {
      type: String,
      default: 'div',
    },
    stageElement: {
      type: String,
      default: 'div',
    },
    navContainer: {
      type: [String, Boolean],
      default: false,
    },
    dotsContainer: {
      type: [String, Boolean],
      default: false,
    },
    checkVisible: {
      type: Boolean,
      default: true,
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
      mouseDrag: this.mouseDrag,
      touchDrag: this.touchDrag,
      pullDrag: this.pullDrag,
      freeDrag: this.freeDrag,
      stagePadding: this.stagePadding,
      merge: this.merge,
      mergeFit: this.mergeFit,
      autoWidth: this.autoWidth,
      startPosition: this.startPosition,
      uRLhashListener: this.uRLhashListener,
      nav: this.nav,
      rewind: this.rewind,
      navText: this.navText,
      navElement: this.navElement,
      slideBy: this.slideBy,
      slideTransition: this.slideTransition,
      dots: this.dots,
      dotsEach: this.dotsEach,
      dotsData: this.dotsData,
      lazyLoad: this.lazyLoad,
      lazyLoadEager: this.lazyLoadEager,
      autoplay: this.autoplay,
      autoplaySpeed: this.autoplaySpeed,
      autoplayTimeout: this.autoplayTimeout,
      autoplayHoverPause: this.autoplayHoverPause,
      smartSpeed: this.smartSpeed,
      fluidSpeed: this.fluidSpeed,
      navSpeed: this.navSpeed,
      dragEndSpeed: this.dragEndSpeed,
      callbacks: this.callbacks,
      responsive: this.responsive,
      responsiveRefreshRate: this.responsiveRefreshRate,
      video: this.video,
      videoHeight: this.videoHeight,
      videoWidth: this.videoWidth,
      animateOut: this.animateOut,
      animateIn: this.animateIn,
      fallbackEasing: this.fallbackEasing,
      info: this.info,
      itemElement: this.itemElement,
      stageElement: this.stageElement,
      navContainer: this.navContainer,
      dotsContainer: this.dotsContainer,
      checkVisible: this.checkVisible,
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
