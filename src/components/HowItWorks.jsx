import { FiCalendar, FiSearch, FiTool, FiCheckCircle } from 'react-icons/fi';
import './HowItWorks.css';

const steps = [
  {
    icon: <FiCalendar />,
    num: '1',
    title: 'Book Your Appointment',
    desc: 'Call, email, or use our online form to schedule your service at a time that works for you.',
  },
  {
    icon: <FiSearch />,
    num: '2',
    title: 'Vehicle Inspection',
    desc: 'Our technicians perform a thorough pre-detail inspection to note existing condition and customize your service.',
  },
  {
    icon: <FiTool />,
    num: '3',
    title: 'Expert Detailing',
    desc: 'Our certified specialists get to work using premium products and proven techniques tailored to your vehicle.',
  },
  {
    icon: <FiCheckCircle />,
    num: '4',
    title: 'Quality Check & Pickup',
    desc: "Final quality inspection ensures every inch meets our high standards before you drive away impressed.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="hiw-header">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">THE DETAILMASTER PROCESS</h2>
        </div>

        <div className="hiw-steps">
          {steps.map((step, i) => (
            <div className="hiw-step" key={i}>
              <div className="hiw-step-icon">
                {step.icon}
                <span className="hiw-step-num">{step.num}</span>
              </div>
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="hiw-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
