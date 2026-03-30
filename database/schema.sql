CREATE TABLE weddings (
  id SERIAL PRIMARY KEY,
  couple_names TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  venue TEXT NOT NULL,
  story TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attendance_status TEXT CHECK (attendance_status IN ('yes','no','maybe')),
  guest_count INT DEFAULT 1,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
