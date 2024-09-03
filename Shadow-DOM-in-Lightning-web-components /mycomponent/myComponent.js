import { LightningElement } from 'lwc';
export default class MyComponent extends LightningElement {
    handleClick() {
        // Accessing elements within the component's shadow DOM
        const div = this.template.querySelector('div');
        div.textContent = 'Button Clicked!';
    }
}

/*
Key Points about Shadow DOM in LWC:

1. Encapsulation: LWC uses Shadow DOM for style and markup encapsulation.
2. Template: The HTML is defined in a separate file using the <template> tag.
3. Styling: CSS is also in a separate file and is automatically scoped to the component.
4. this.template: Used to query elements within the component's shadow DOM.

Differences between LWC and standard Web Components:
1. Base Class: LWC extends LightningElement instead of HTMLElement.
2. Template Definition: LWC uses separate HTML files, unlike inline templates in standard WC.
3. Reactivity: LWC has built-in reactivity system for properties and rendering.
4. Performance Optimizations: LWC includes various optimizations for better performance.
5. Synthetic Shadow DOM: LWC uses a synthetic Shadow DOM polyfill in some browsers.
*/