import styles from "./DsReefTest.module.scss";
import { component, signal } from "reefjs";

/**
 * Custom element representing a ReefJS test component.
 * @extends HTMLElement
 */
export class DsReefTest extends HTMLElement {
  /**
   * Constructs a new DsReefTest.
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.base = this.shadowRoot.querySelector("#app");
    this.uuid = crypto.randomUUID();
    this.data = signal(
      {
        heading: "My Todos",
        todos: ["Swim", "Climb", "Jump", "Play"],
        emoji: "👋🎉",
      },
      this.uuid
    );
    this.events = {
      addTo: () => this.data.todos.push("foobar"),
      removeTo: () => this.data.todos.pop(),
    };
    this.app = component(this.base, () => this.templateContent(), {
      events: this.events,
      signals: [this.uuid],
    });
  }

  /**
   * Returns a list of attributes to be observed for changes.
   * @static
   * @returns {Array} List of observed attributes.
   */
  static get observedAttributes() {
    return [];
  }

  /**
   * Generates the base template for the component.
   * @returns {string} The base template.
   */
  templateBase() {
    return `
      <style>${styles.toString()}</style>
      <div class="${styles.locals.base}" id="app"></div>
    `;
  }

  /**
   * Generates the content template for the component.
   * @returns {string} The content template.
   */
  templateContent() {
    let { heading, todos, emoji } = this.data;
    return `
      <button id="button" onclick="addTo()">Click me</button>
      <h1 onclick="removeTo()">${heading} ${emoji}</h1>
      <ul>
        ${todos.map((todo) => `<li key="${todo}">${todo}</li>`).join("")}
      </ul>`;
  }

  /**
   * Called when the element is appended to the DOM.
   */
  connectedCallback() {
    this.app.start();
  }

  /**
   * Called when the element is removed from the DOM.
   */
  disconnectedCallback() {
    this.app.stop();
  }
}

// Define the new web component
if ("customElements" in window) {
  customElements.define("ds-reef-test", DsReefTest);
}
