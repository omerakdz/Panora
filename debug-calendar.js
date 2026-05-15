// Debug script om alle calendar events op een datum te zien
const fs = require('fs');
const { google } = require('googleapis');

// Load .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  
  const equalIndex = line.indexOf('=');
  if (equalIndex > 0) {
    const key = line.substring(0, equalIndex).trim();
    let value = line.substring(equalIndex + 1).trim();
    
    // Remove inline comments
    const commentIndex = value.indexOf(' #');
    if (commentIndex > 0) {
      value = value.substring(0, commentIndex).trim();
    }
    
    // Remove quotes
    value = value.replace(/^["']|["']$/g, '');
    
    if (key && value) {
      process.env[key] = value;
    }
  }
});

async function debugCalendarEvents() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  const date = '2026-05-23';
  const [year, month, day] = date.split('-').map(Number);
  const startOfDay = new Date(year, month - 1, day, 0, 0, 0, 0);
  const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

  console.log(`\n📅 Checking events for ${date}`);
  console.log(`Time range: ${startOfDay.toISOString()} - ${endOfDay.toISOString()}\n`);

  if (!process.env.GOOGLE_CALENDAR_IDS) {
    console.error('❌ GOOGLE_CALENDAR_IDS not found in environment!');
    console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('GOOGLE')));
    process.exit(1);
  }

  const calendarIds = process.env.GOOGLE_CALENDAR_IDS.split(',').map(id => id.trim());
  
  console.log(`📋 Calendars to check (${calendarIds.length}):`);
  calendarIds.forEach((id, index) => console.log(`   ${index + 1}. ${id}`));
  console.log('');

  for (const calendarId of calendarIds) {
    console.log(`\n🔍 Calendar: ${calendarId}`);
    console.log('━'.repeat(80));
    
    try {
      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];
      console.log(`Found ${events.length} event(s):\n`);

      if (events.length === 0) {
        console.log('   (no events)');
      } else {
        events.forEach((event, index) => {
          const start = new Date(event.start.dateTime || event.start.date);
          const end = new Date(event.end.dateTime || event.end.date);
          
          console.log(`   ${index + 1}. "${event.summary || '(No title)'}"`);
          console.log(`      Start: ${start.toLocaleString('nl-BE')}`);
          console.log(`      End:   ${end.toLocaleString('nl-BE')}`);
          console.log(`      Type:  ${event.start.dateTime ? 'Time event' : 'All-day event'}`);
          console.log('');
        });
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }
}

debugCalendarEvents().catch(console.error);
