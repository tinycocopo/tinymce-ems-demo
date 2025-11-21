"use client";

import { Editor } from "@tinymce/tinymce-react";

const tinymceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

const advtemplate_templates = [
  {
    title: "Customer onboarding",
    items: [
      {
        title: "Welcome new subscriber",
        content:
          '<p dir="ltr"><strong>Welcome to the Brightside community!</strong></p>\n<p dir="ltr">Thanks for joining our list&nbsp;&mdash; you’ll be the first to hear about fresh launches, limited offers, and behind-the-scenes updates.</p>\n<ul>\n<li dir="ltr"><strong>Step one:</strong> Add <a href="mailto:hello@brightside.co">hello@brightside.co</a> to your contacts so you never miss an email.</li>\n<li dir="ltr"><strong>Step two:</strong> Tell us what you’re interested in so we can tailor content just for you.</li>\n</ul>\n<p dir="ltr">Talk soon,<br />The Brightside Team 🌞</p>',
      },
      {
        title: "First purchase thank-you",
        content:
          '<p dir="ltr"><strong>You did it &mdash; your order is on the way!</strong></p>\n<p dir="ltr">Hi {{ subscriber.first_name | default: "friend" }},</p>\n<p dir="ltr">Thank you for trusting Brightside with your first purchase. We’re already packing it with care.</p>\n<ul>\n<li dir="ltr"><strong>Order number:</strong> {{ order.number }}</li>\n<li dir="ltr"><strong>Estimated arrival:</strong> {{ order.estimated_delivery_date }}</li>\n<li dir="ltr"><strong>Need help?</strong> Reply to this email or text us at (800) 555-0199.</li>\n</ul>\n<p dir="ltr">As a welcome gift, enjoy <strong>15% off</strong> your next order with code <span style="background-color:#fef3c7;padding:2px 6px;border-radius:4px;">HELLOAGAIN</span>.</p>',
      },
    ],
  },
  {
    title: "Promotions & launches",
    items: [
      {
        title: "Product launch spotlight",
        content:
          '<p dir="ltr"><strong>Introducing the Glow Serum</strong></p>\n<p dir="ltr">Meet the newest member of our skincare lineup: a vitamin C powerhouse that brightens, hydrates, and defends your skin in just one pump.</p>\n<ul>\n<li dir="ltr"><strong>Why you’ll love it:</strong> Lightweight texture, clinically proven results, and recyclable packaging.</li>\n<li dir="ltr"><strong>Launch offer:</strong> Save 20% with code <span style="background-color:#dbeafe;padding:2px 6px;border-radius:4px;">GLOWUP</span> through Sunday.</li>\n</ul>\n<p dir="ltr"><a href="https://example.com/glow-serum" style="background-color:#111827;color:#ffffff;padding:10px 18px;border-radius:4px;text-decoration:none;">Shop the Glow Serum →</a></p>',
      },
      {
        title: "48-hour flash sale",
        content:
          '<p dir="ltr"><strong>72-Hour Flash Sale Starts Now!</strong></p>\n<p dir="ltr">Gear up for the season with sitewide savings. From trail runners to breathable layers, everything is <strong>up to 35% off</strong>.</p>\n<ul>\n<li dir="ltr"><strong>Sale dates:</strong> Ends {{ now | plus_days: 3 | date: "%B %d at %I:%M %p" }}.</li>\n<li dir="ltr"><strong>Members-only perks:</strong> Free expedited shipping on orders over $75.</li>\n<li dir="ltr"><strong>Reminder:</strong> Discount applies automatically at checkout.</li>\n</ul>\n<p dir="ltr"><a href="https://example.com/sale" style="background-color:#2563eb;color:#ffffff;padding:10px 18px;border-radius:4px;text-decoration:none;">Grab your favorites →</a></p>',
      },
    ],
  },
  {
    title: "Retention & re-engagement",
    items: [
      {
        title: "Abandoned cart reminder",
        content:
          '<p dir="ltr"><strong>Still thinking it over?</strong></p>\n<p dir="ltr">You left a few things behind &mdash; and they’re almost gone. Complete your order before it sells out.</p>\n<table dir="ltr" cellpadding="12" style="border:1px solid #e5e7eb;border-radius:8px;">\n  <tr>\n    <td><img src="https://example.com/cart-item.jpg" alt="Cart item" width="96" style="border-radius:6px;" /></td>\n    <td>\n      <p dir="ltr"><strong>{{ cart.items[0].title }}</strong></p>\n      <p dir="ltr">Color: {{ cart.items[0].variant }}</p>\n      <p dir="ltr">Quantity: {{ cart.items[0].quantity }}</p>\n    </td>\n  </tr>\n</table>\n<p dir="ltr"><a href="{{ cart.url }}" style="background-color:#16a34a;color:#ffffff;padding:10px 18px;border-radius:4px;text-decoration:none;">Return to your cart →</a></p>',
      },
      {
        title: "Win-back campaign",
        content:
          '<p dir="ltr"><strong>We miss you, {{ subscriber.first_name | default: "friend" }}</strong></p>\n<p dir="ltr">It’s been a while since your last visit. We’ve refreshed the shop with new arrivals we think you’ll love.</p>\n<ul>\n<li dir="ltr"><strong>Come back perk:</strong> 20% off your next order with code <span style="background-color:#fee2e2;padding:2px 6px;border-radius:4px;">MISSEDYOU</span>.</li>\n<li dir="ltr"><strong>What’s new:</strong> Handcrafted essentials, member exclusives, and curated bundles.</li>\n<li dir="ltr"><strong>Need styling help?</strong> Book a 15-minute fit consultation with our team.</li>\n</ul>\n<p dir="ltr">See you soon,<br />Team Brightside</p>',
      },
    ],
  },
];


type EditorClientProps = {
  initialValue?: string;
  onChange?: (content: string) => void;
};

export default function EditorClient({
  initialValue,
  onChange,
}: EditorClientProps) {
  return (
      <Editor
apiKey={tinymceApiKey}
initialValue={initialValue}
tinymceScriptSrc={`https://cdn.tiny.cloud/1/${tinymceApiKey}/tinymce/8/tinymce.min.js`}
      init={{
        height: 500,
        menubar: false,
        toolbar_location: "bottom",
        plugins: "inlinecss fullpagehtml mergetags advtemplate lists link image table code help wordcount",
        toolbar: [
          'fullpagehtml mergetags inserttemplate | undo redo | formatselect | bold italic emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code'
        ],
        advtemplate_templates,
        skin: "oxide-dark",
        content_css: "dark",
        mergetags_list: [
          {
            title: 'Customer',
            menu: [
              {
                value: 'First Name',
                title: 'First Name',
              },
              {
                value: 'Company Name',
                title: 'Company Name',
              },
              {
                value: 'Job Title',
                title: 'Job Title',
              },
              {
                value: 'Email Address',
                title: 'Email Address',
              }
            ]
          },
          {
            title: 'Compliance & Footer',
            menu: [
              {
                value: 'Unsubscribe Link',
                title: 'Unsubscribe',
              },
              {
                value: 'Update Preferences',
                title: 'Update Preferences',
              },
              {
                value: 'Company Address',
                title: 'Company Address',
              }
            ]
          }
        ],
      }}

      onEditorChange={(content) => {
        onChange?.(content);
      }}
    />
  );
}
