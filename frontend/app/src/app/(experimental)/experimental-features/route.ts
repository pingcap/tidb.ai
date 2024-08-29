import { experimentalFeatures } from '@/experimental/experimental-features';
import { NextResponse } from 'next/server';

export function GET () {
  return NextResponse.json(experimentalFeatures(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
  });
}
