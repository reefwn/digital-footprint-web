'use client';

import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UAParser from 'ua-parser-js';
import DynamicTable from '@/components/dynamic-table';
import Heading from '@/components/heading';

interface FingerprintData {
  visitorId: string;
  components: {
    [key: string]: unknown;
  };
}

export default function Home() {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [fingerprintData, setFingerprintData] = useState<FingerprintData | null>(null);
  const [uaInfo, setUaInfo] = useState<UAParser.IResult | null>(null);

  useEffect(() => {
    // IP Address
    fetch('/api/ip')
      .then((response) => response.json())
      .then((data) => { setIpAddress(data.ip); })
      .catch((error) => { console.error('Error fetching IP address:', error); });

    // Browser Fingerprint
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => { setFingerprintData(result); })
      .catch((error) => { console.error('Error getting fingerprint:', error); });

    // UserAgent
    const parser = new UAParser();
    const result = parser.getResult();
    setUaInfo(result);
  }, []);

  const loadingText = (text?: string | null) => {
    return text ?? 'Loading...';
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <Heading level={4}>Your Public IP Address:</Heading>
        <span className='text-gray-500'>{loadingText(ipAddress)}</span>
      </div>

      <div className='mb-8'>
        <Heading level={4}>Your Browser Fingerprint:</Heading>
        <span className='text-gray-500'>{loadingText(fingerprintData?.visitorId)}</span>
        <div className='mt-4'>
          <DynamicTable data={fingerprintData?.components} />
        </div>
      </div>

      <div className='mb-8'>
        <Heading level={4}>Your UserAgent Information:</Heading>
        <span className='text-gray-500'>{loadingText(uaInfo?.ua)}</span>
        <div className='mt-4'>
          <DynamicTable data={uaInfo} />
        </div>
      </div>
    </div>
  );
}
