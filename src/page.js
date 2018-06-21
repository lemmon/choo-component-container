const html = require('nanohtml')
const Button = require('./button.js')
const Alive = require('./keepalive.js')

const slides = [
  {
    caption: `Page Primo`,
    content: (state, render) => html`
      <div class="p05">
        <div class="p05">${render.component(Button, { caption: 'First Button', state }, 'a')}</div>
        <div class="p05">${render.component(Button, { caption: 'Second Button', state }, 'b')}</div>
        <div class="p05">${render.component(Alive)}</div>
      </div>
    `,
  },
  {
    caption: `Page Secondo`,
    content: (state, render) => html`
      <div class="p1">
        ${render.component(Button, { caption: 'Third Button', state }, 'c')}
      </div>
    `,
  },
]

module.exports = (state, render) => html`
  <body class="col justify-center">

    <style>
    [id^="ncid-"] {
      border: 1px dashed orange;
    }
    </style>

    <div>
      <div class="max40 mx p1">

        <nav>
          <ul class="row">
            ${slides.map((item, index) => html`
              <li><a
                class="a-anchor ${index === state.page ? `bold` : `ul`} p1"
                href="#"
                onclick=${e => {
                  e.preventDefault()
                  state.page = index
                  render()
                }}
              >${item.caption}</a></li>
            `)}
          </ul>
        </nav>

        <div class="p1">
          <div class="ba b-black-20">
            ${slides[state.page].content(state, render)}
          </div>
        </div>

        <div class="row">
          <div class="p1">Iteration: ${state.iteration}</div>
          <div class="p1">
            <a
              class="ul"
              href="#"
              onclick=${e => {
                e.preventDefault()
                render()
              }}
            >re-render</a></div>
        </div>

      </div>
    </div>

  </body>
`
