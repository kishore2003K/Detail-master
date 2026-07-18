import './Hours.css';

const schedule = [
  { day: 'Monday', hours: '8am – 6pm' },
  { day: 'Tuesday', hours: '8am – 6pm' },
  { day: 'Wednesday', hours: '8am – 6pm' },
  { day: 'Thursday', hours: '8am – 6pm' },
  { day: 'Friday', hours: '8am – 6pm' },
  { day: 'Saturday', hours: '9am – 5pm' },
  { day: 'Sunday', hours: '10am – 4pm' },
];

const Hours = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section className="hours">
      <div className="container">
        <div className="hours-card">
          <div className="hours-left">
            <span className="section-label">When We're Open</span>
            <h2 className="section-title hours-title">BUSINESS HOURS</h2>
            <p className="hours-note">
              Walk-ins welcome! Appointments recommended for premium services.
            </p>
          </div>
          <div className="hours-right">
            {schedule.map((s) => (
              <div
                key={s.day}
                className={`hours-row ${s.day === today ? 'today' : ''}`}
              >
                <span className="hours-day">{s.day.slice(0, 3)}</span>
                <span className="hours-dots" />
                <span className="hours-time">{s.hours}</span>
                {s.day === today && <span className="today-badge">Today</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hours;
