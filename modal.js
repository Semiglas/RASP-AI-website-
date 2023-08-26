

export default class Modal  {
    constructor (options) {
        this.$openButton = document.querySelectorAll(".modal-button")
        this.$selector = document.querySelector(`body > [data-type='wrapper']`)
        this.options = {...this.defaults, ...options}
        this.modalItself = this.$selector.querySelector("[data-type='modal']")
        this.#configure()
        this.listenForButtons()
    }

    listenForButtons () {

        this.$openButton.forEach(e => e.addEventListener('click', () => {
            this.open()
        }))
        console.log('hui')
        const closeButtons = this.$selector.querySelectorAll("[data-type='modal__close-button']")
           closeButtons.forEach(button => {

                button.addEventListener("click", (e) => {
                    console.log("im propogatinfg")
                    this.close(e)
                })
            })
        console.log(closeButtons)

    }



    defaults = {
        backgroundColor: "#000000",
        backgroundOpacity: "0.7",
        // paddingInline : '48px',
        // paddingBlock : "32px",
        blur:true,
        disableScroll: true,
        clickOutside:true
    }

    open() {
        // console.log(this.$selector.classList)
        this.$selector.classList.add('visible');
        this.disableScrollEffect()
    }

    close(e) {
        console.log(e.currentTarget)
        if (e.currentTarget === document.querySelector("[data-type='modal__close-button']")) {
            console.log(this)
            this.$selector.classList.remove('visible')
            document.querySelector('body').style.overflow = 'auto'
        }

        if (e.target === this) {
        this.classList.remove('visible')
        document.querySelector('body').style.overflow = 'auto'
        }

    }

    #configure() {
        let userConfig = this.options;
        if (userConfig.backgroundColor && userConfig.backgroundColor !== "transparent") {
            var rgbColor = this.convertToRGB(userConfig.backgroundColor);
            this.$selector.style.backgroundColor = `${rgbColor}`
        }


        if (userConfig.backgroundOpacity)  {
            this.$selector.style.backgroundColor = `${rgbColor?.slice(0,-1)}, ${userConfig.backgroundOpacity})`
        }
        if (userConfig.paddingInline)  this.modalItself.style.paddingInline = `${userConfig.paddingInline}`
        if (userConfig.paddingBlock)  this.modalItself.style.paddingBlock = `${userConfig.paddingBlock}`
        if (userConfig.blur) {
            this.$selector.style.backdropFilter = "blur(10px)"
        }
        if (userConfig.disableScroll) this.disableScrollEffect()
        if (userConfig.clickOutside) this.clickOutside()
    }

    /*

    article {
  position: relative;
  z-index: 1;
}

article::before {
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
opacity: .4;
z-index: -1;
background: url(path/to/your/image);
}


    */

    disableScrollEffect() {
        if(document.querySelector('.visible')) {
            document.querySelector('body').style.overflow = 'hidden'
        }

    }


    clickOutside() {
        this.$selector.addEventListener('click', this.close)
    }


    convertToRGB(color) {
        if (!color) return
        if (color.startsWith('#')) {
          if(color.length != 7){
              throw "Only six-digit hex colors are allowed.";
          }
          var aRgbHex = color.slice(1).match(/.{1,2}/g);
          var aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
          ];
          return `rgba(${aRgb.join(',')})`;
        } else if (color.startsWith('rgb')) {
          return color;
        } else {
          throw "Unknown color format.";
        }
      }

}