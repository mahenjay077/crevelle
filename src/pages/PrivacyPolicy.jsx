import LegalLayout from './LegalLayout.jsx'
import { BUSINESS } from '../content/site.js'

export default function PrivacyPolicy() {
  return (
    <LegalLayout eyebrow="Privacy" title="Privacy policy" updated="[REPLACE: date]">
      <section>
        <h2>What we collect</h2>
        <p>When you send a pre-order request we collect the details you give us:</p>
        <ul>
          <li>Your name, phone/WhatsApp number and (optionally) email address</li>
          <li>Your delivery area and preferred delivery date</li>
          <li>Your order preferences, gift message and any notes, including allergy information you choose to share</li>
          <li>Any reference images you choose to upload</li>
        </ul>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>
          We use your details only to confirm, prepare and deliver your order and to contact you about it. We do not
          sell your information or share it for marketing. We share your name, number and address with a delivery
          partner only when needed to deliver your order.
        </p>
      </section>
      <section>
        <h2>How long we keep it</h2>
        <p>[REPLACE: how long order records are kept and why, e.g. for accounting or food-safety traceability.]</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to see, correct or delete the information we hold about you at any time by contacting{' '}
          {BUSINESS.email}.
        </p>
      </section>
    </LegalLayout>
  )
}
