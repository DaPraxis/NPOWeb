'use client';

import { useEffect, useRef } from 'react';

export default function ZeffyDonation() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Optionally: You can dynamically adjust height or handle postMessage communication here
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '500px' }}>
      <iframe
        ref={iframeRef}
        title="Donation form powered by Zeffy"
        src="https://www.zeffy.com/embed/donation-form/bring-research-to-every-student"
        allow="payment *"
        allowTransparency={true}
        style={{
          position: 'absolute',
          border: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

    </div>
    // <div style="position:relative;overflow:hidden;width:100%;padding-top:120px;"><iframe title='Donation form powered by Zeffy' style='position: absolute; border: 0; top:0;left:0;bottom:0;right:0;width:100%;height:120px' src='https://www.zeffy.com/embed/thermometer/bring-research-to-every-student'  allowTransparency="true"></iframe></div>
  );
}
