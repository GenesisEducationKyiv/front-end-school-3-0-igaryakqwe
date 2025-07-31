import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { API_URL } from '../../src/constants/global';
import { CreateTrackDto } from '../../src/features/tracks/api/dto/tracks.dto';
import { createSlug } from '../../src/utils/string.utils';
import { genresMock,metaMock, tracksMock } from './tracks';

const handlers = [
  http.get(`${API_URL}/tracks`, () =>
    HttpResponse.json({
      data: tracksMock,
      meta: metaMock,
    })
  ),

  http.post(`${API_URL}/tracks`, async ({ request }) => {
    const body = (await request.json()) as CreateTrackDto;

    const slug = createSlug(body.title);

    if (slug === tracksMock[0].slug) {
      return HttpResponse.json(
        {
          error: 'Track with this title already exists',
        },
        {
          status: 409,
        }
      );
    }

    return HttpResponse.json(tracksMock[1]);
  }),

  http.get(`${API_URL}/tracks/:slug`, ({ params }) => {
    const slug = params.slug as string;

    if (slug === 'track-3') {
      return HttpResponse.json(
        {
          error: 'Track not found',
        },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(tracksMock[0]);
  }),

  http.put(`${API_URL}/tracks/${tracksMock[1].id}`, () =>
    HttpResponse.json(tracksMock[0])
  ),

  http.delete(`${API_URL}/tracks/${tracksMock[0].id}`, ({ params }) => {
    const id = params.id as string;

    if (id === '999') return HttpResponse.json(null, { status: 204 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.post(`${API_URL}/tracks/delete`, async ({ request }) => {
    const body = (await request.json()) as { ids: string[] };

    const ids = body.ids;

    if (ids.includes('999')) {
      return HttpResponse.json({
        success: ids.filter((id) => id !== '999'),
        failed: ['999'],
      });
    }

    return HttpResponse.json({
      success: ids,
      failed: [],
    });
  }),

  http.post(`${API_URL}/tracks/:id/upload`, ({ params }) => {
    const id = params.id as string;

    if (id === '999') {
      return HttpResponse.json(
        {
          error: 'Track not found',
        },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(tracksMock[0]);
  }),

  http.delete(`${API_URL}/tracks/:id/file`, ({ params }) => {
    const id = params.id as string;

    if (id === '999') {
      return HttpResponse.json(
        {
          error: 'Track not found',
        },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(tracksMock[0]);
  }),

  http.get(`${API_URL}/genres`, () => {
    return HttpResponse.json(genresMock);
  }),
];

export const server = setupServer(...handlers);
