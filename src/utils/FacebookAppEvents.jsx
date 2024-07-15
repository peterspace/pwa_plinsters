const unixTimeNow = Math.floor(Date.now() / 1000);
console.log({ unixTimeNow });

const min = 1;
const max = 9999;
let randomNumberFloat = Math.random() * (max - min) + min;
const random = Math.round(randomNumberFloat);
console.log({ random });


export const leadEvent = async (data) => {
  const unixTimeNow = Math.floor(Date.now() / 1000);
  window.FB.AppEvents.logEvent('Lead', data.value ? data.value : 0, {
    advertiser_tracking_enabled: 1,
    application_tracking_enabled: 1,
    currency: 'USD',
    event_time: data.date ? data.date : unixTimeNow,
    external_id: data.external_id ? data.external_id.toString() : 'user123',
    client_ip_address: data.client_ip_address,
    client_user_agent: data.client_user_agent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    fbclid: data.fbclid // Include fbclid if available
  });
};


export const purchaseEvent = async (data) => {
  const unixTimeNow = Math.floor(Date.now() / 1000);
  window.FB.AppEvents.logPurchase(data.value ? data.value : 10, 'USD', {
    advertiser_tracking_enabled: 1,
    application_tracking_enabled: 1,
    event_time: data.date ? data.date : unixTimeNow,
    external_id: data.external_id ? data.external_id.toString() : 'user123',
    client_ip_address: data.client_ip_address,
    client_user_agent: data.client_user_agent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    fbclid: data.fbclid // Include fbclid if available
  });
};
