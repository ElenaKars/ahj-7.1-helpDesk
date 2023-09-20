export default async function createRequest(options) {
    let url;
    let params;
  
    switch (options.action) {
      case 'createTicket':
        url = `http://localhost:5050/?method=${options.action}`;
        params = {
          method: options.method,
          body: options.data,
        };
        break;
  
      case 'addTickets':
      case 'changeTicket':
        url = `http://localhost:5050/?method=${options.action}`;
        params = {
          method: options.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(options.data),
        };
        break;
  
      default:
        url = `http://localhost:5050/?method=${options.action}&id=${options.data}`;
        params = {
          method: options.method,
          headers: { 'Content-Type': 'application/json' },
        };
    }
  
    const result = await fetch(url, params);
    const json = await result.json();
    if (options.callback) options.callback(json);
  }