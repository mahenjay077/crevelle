import LegalLayout from './LegalLayout.jsx'
import { BUSINESS } from '../content/site.js'

export default function Terms() {
  return (
    <LegalLayout eyebrow="Terms" title="Terms, delivery & refunds" updated="[REPLACE: date]">
      <section>
        <h2>Pre-orders</h2>
        <p>
          Sending a request through our website does not confirm an order. Your order is confirmed once we have agreed
          the details with you and received payment. Prices on the website may change; the price we confirm with you
          is the price you pay.
        </p>
      </section>
      <section>
        <h2>Payment</h2>
        <p>[REPLACE: accepted payment methods, e.g. bank transfer or card link, and when payment is due.]</p>
      </section>
      <section>
        <h2>Delivery</h2>
        <ul>
          <li>We currently deliver to {BUSINESS.serviceArea} only.</li>
          <li>Delivery fees are charged separately and confirmed before you pay.</li>
          <li>[REPLACE: delivery windows and what happens if nobody is available to receive the order.]</li>
        </ul>
      </section>
      <section>
        <h2>Cancellations & refunds</h2>
        <p>[REPLACE: cancellation cut-off, refund rules and how to report a damaged or incorrect order.]</p>
      </section>
      <section>
        <h2>Allergens</h2>
        <p>
          Our cookies are made in a kitchen that handles wheat (gluten), milk, egg, soy and tree nuts. We list the
          allergens in each product, but cannot guarantee any product is free from cross-contact. Please tell us about
          allergies before ordering.
        </p>
      </section>
      <section>
        <h2>Storage</h2>
        <p>[REPLACE: storage and best-before guidance, confirmed by your own shelf-life testing.]</p>
      </section>
    </LegalLayout>
  )
}
