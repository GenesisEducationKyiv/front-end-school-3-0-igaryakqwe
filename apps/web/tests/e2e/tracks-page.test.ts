import { expect } from '@playwright/test';

import { test } from '../fixtures/test-tracks-fixture';

test.describe('Tracks Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have title and icon', async ({ page }) => {
    await expect(page).toHaveTitle('Music Platform');
    const icon = page.getByTestId('logo-link');
    await expect(icon).toHaveAttribute('href', '/');
  });

  test.describe('Tracks list', () => {
    test('should show loading state', async ({ page }) => {
      const loadingElement = page.getByTestId('loading-tracks');
      await expect(loadingElement).toBeVisible();
      await expect(loadingElement).toHaveAttribute('data-loading', 'true');
    });

    test('should show empty state when no tracks are available', async ({
      page,
    }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchInput = page.getByTestId('search-input');
      await searchInput.fill('nonexistent track');

      const emptyMessage = page.getByText('No tracks found');
      await expect(emptyMessage).toBeVisible();
    });

    test('should display tracks when data is loaded', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const tracksList = page.getByTestId('tracks-list');
      await expect(tracksList).toBeVisible();

      const trackItemsCount = await tracksList.locator('*').count();
      expect(trackItemsCount).toBeGreaterThan(0);
    });
  });

  test.describe('Tracks filters', () => {
    const tracksIds: string[] = [];
    test.beforeEach(async ({ getTrack, createTrack }) => {
      const track = await createTrack(getTrack());
      tracksIds.push(track.id);
    });

    test.afterAll(async ({ deleteTrack }) => {
      await Promise.all(tracksIds.map((id) => deleteTrack(id)));
    });

    test('should filter tracks by title', async ({ page, getTrack }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchTerm = getTrack().title;
      const searchInput = page.getByTestId('search-input');
      await searchInput.fill(searchTerm);

      const trackItem = page.getByTestId(/^track-item-/).first();
      await expect(trackItem).toBeVisible();

      const titleElement = trackItem.getByTestId(/title$/);
      await expect(titleElement).toContainText(searchTerm);
    });

    test('should filter tracks by artist', async ({ page, getTrack }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchTerm = getTrack().artist;
      const artistInput = page.getByTestId('filter-artist');
      await artistInput.fill(searchTerm);

      const trackItem = page.getByTestId(/^track-item-/).first();
      await expect(trackItem).toBeVisible();

      const artistElement = trackItem.getByTestId(/artist$/);
      await expect(artistElement).toContainText(searchTerm);
    });

    test('should filter tracks by album', async ({ page, getTrack }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchTerm = getTrack().album as string;
      const albumInput = page.getByTestId('filter-album');
      await albumInput.fill(searchTerm);

      const trackItem = page.getByTestId(/^track-item-/).first();
      await expect(trackItem).toBeVisible();

      const albumElement = trackItem.getByTestId(/album$/);
      await expect(albumElement).toContainText(searchTerm);
    });

    test('should filter tracks by genre', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const genreFilter = page.getByTestId('filter-genre');
      await genreFilter.click();

      const genreOptions = await page.getByTestId(/^command-option-/).all();

      const selectedGenre = await genreOptions[1].textContent();
      const trimmedGenre = selectedGenre?.trim();
      await genreOptions[1].click();

      const genreElement = page.getByTestId(`genre-${trimmedGenre}`).first();
      await expect(genreElement).toBeVisible();
    });
  });

  test.describe('Tracks operations', () => {
    const updatedTrack = {
      title: 'Updated Track',
      artist: 'Updated Artist',
      album: 'Updated Album',
      coverImage:
        'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      genre: 'Rock',
    };

    test('should allow to create track', async ({
      page,
      deleteTrack,
      getFullTrack,
    }) => {
      const track = getFullTrack();
      const createTrackButton = page.getByTestId('create-track-button');
      await createTrackButton.click();

      const trackForm = page.getByTestId('track-form');
      await expect(trackForm).toBeVisible();

      await trackForm.getByTestId('input-title').fill(track.title);
      await trackForm.getByTestId('input-artist').fill(track.artist);
      await trackForm.getByTestId('input-album').fill(track.album as string);
      await trackForm
        .getByTestId('input-cover-image')
        .fill(track.coverImage as string);

      await trackForm.getByTestId('genre-selector').click();
      const input = trackForm.getByTestId('genre-selector').locator('input');
      await input.fill(track.genres[0]);

      const genreOption = page.getByRole('option', { name: track.genres[0] });
      await expect(genreOption).toBeVisible();
      await genreOption.click();

      await trackForm.click({ position: { x: 10, y: 10 } });

      await expect(genreOption).not.toBeVisible();

      await trackForm.getByTestId('submit-button').click();

      const trackItem = page.getByTestId(/^track-item-/).first();
      await expect(trackItem).toBeVisible();

      const titleElement = trackItem.getByTestId(/title$/);
      await expect(titleElement).toBeVisible();
      await expect(titleElement).toHaveText(track.title);

      const testId = await trackItem.getAttribute('data-testid');
      const trackId = testId?.split('-').at(-1);

      await deleteTrack(trackId as string);
    });

    test('should allow to edit track', async ({
      page,
      createTrack,
      deleteTrack,
      getTrack,
    }) => {
      const data = await createTrack(getTrack());

      const tracksList = page.getByTestId('tracks-list');
      await expect(tracksList).toBeVisible();

      const trackItems = await page.getByTestId(/^track-item-/).all();
      expect(trackItems.length).toBeGreaterThan(0);

      const editButton = trackItems[0].getByTestId(/edit/).first();
      await editButton.click();

      const editForm = page.getByTestId('track-form');
      await expect(editForm).toBeVisible();

      await editForm.getByTestId('input-title').fill(updatedTrack.title);
      await editForm.getByTestId('input-artist').fill(updatedTrack.artist);
      await editForm.getByTestId('input-album').fill(updatedTrack.album);
      await editForm
        .getByTestId('input-cover-image')
        .fill(updatedTrack.coverImage);

      await editForm.getByTestId('genre-selector').click();
      const editInput = editForm.getByTestId('genre-selector').locator('input');
      await editInput.fill(updatedTrack.genre);

      const genreOption = page.getByRole('option', {
        name: updatedTrack.genre,
      });
      await expect(genreOption).toBeVisible();
      await genreOption.click();

      await editForm.click({ position: { x: 10, y: 10 } });

      await expect(genreOption).not.toBeVisible();

      await editForm.getByTestId('submit-button').click();

      const updatedTrackTitle = page
        .getByTestId(/title$/)
        .filter({ hasText: updatedTrack.title });
      await expect(updatedTrackTitle).toBeVisible();
      await expect(updatedTrackTitle).toHaveText(updatedTrack.title);

      await deleteTrack(data.id);
    });

    test('should allow to delete track', async ({
      page,
      createTrack,
      getTrack,
    }) => {
      const trackData = await createTrack(getTrack());

      const tracksList = page.getByTestId('tracks-list');
      await expect(tracksList).toBeVisible();

      const trackItem = page.getByTestId(`track-item-${trackData.id}`);
      await expect(trackItem).toBeVisible();

      const deleteButton = trackItem.getByTestId(/delete/).first();
      await deleteButton.click();

      const confirmButton = page.getByTestId('confirm-delete');
      await confirmButton.click();

      await expect(trackItem).not.toBeVisible();
    });

    test('should allow to delete multiple tracks', async ({
      page,
      createTrack,
      getTrack,
      getUpdatedTrack,
    }) => {
      const testTrack1 = getTrack();
      const testTrack2 = getUpdatedTrack();

      const [data1, data2] = await Promise.all([
        createTrack(testTrack1),
        createTrack(testTrack2),
      ]);

      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const trackItems = await page.getByTestId(/^track-item-/).all();
      expect(trackItems.length).toBeGreaterThanOrEqual(2);

      const selectMode = page.getByTestId('select-mode-toggle');
      await selectMode.click();

      const trackItem1 = page.getByTestId(`track-item-${data1.id}`);
      const trackItem2 = page.getByTestId(`track-item-${data2.id}`);

      const firstTrackCheckbox = trackItem1.getByTestId(
        `track-checkbox-${data1.id}`
      );
      const secondTrackCheckbox = trackItem2.getByTestId(
        `track-checkbox-${data2.id}`
      );

      await expect(firstTrackCheckbox).toBeVisible();
      await expect(secondTrackCheckbox).toBeVisible();

      await firstTrackCheckbox.check({ force: true });
      await secondTrackCheckbox.check({ force: true });

      const deleteButton = page.getByTestId('bulk-delete-button');
      await expect(deleteButton).toBeVisible();
      await deleteButton.click();

      const confirmButton = page.getByTestId('confirm-delete');
      await confirmButton.click();

      const notification = page.getByText('Tracks deleted successfully');
      await expect(notification).toBeVisible();

      await expect(trackItem1).not.toBeVisible();
      await expect(trackItem2).not.toBeVisible();
    });

    test('should allow to upload and play audio for a track', async ({
      page,
      createTrack,
      getTrack,
    }) => {
      const audioTestTrack = getTrack();
      const trackData = await createTrack(audioTestTrack);

      const trackItem = page.getByTestId(`track-item-${trackData.id}`);
      await expect(trackItem).toBeVisible();

      const uploadButton = trackItem.getByTestId(/^upload-track-/);
      await expect(uploadButton).toBeVisible();

      await page.evaluate(() => {
        const audioBlob = new Blob(['dummy audio content'], {
          type: 'audio/mp3',
        });
        const file = new File([audioBlob], 'test-audio.mp3', {
          type: 'audio/mp3',
        });

        (window as any).testAudioFile = file;
      });

      const fileChooserPromise = page.waitForEvent('filechooser');
      await uploadButton.click();
      const fileChooser = await fileChooserPromise;

      await fileChooser.setFiles({
        name: 'test-audio.mp3',
        mimeType: 'audio/mp3',
        buffer: Buffer.from('dummy audio content'),
      });

      const playButton = trackItem.getByTestId(/^play-button-/).first();
      await expect(playButton).toBeVisible({ timeout: 10000 });

      await playButton.click();

      const pauseButton = trackItem.getByTestId(/^pause-button-/);
      await expect(pauseButton).toBeVisible({ timeout: 5000 });

      const deleteButton = trackItem.getByTestId(/delete/).first();
      await deleteButton.click();

      const confirmButton = page.getByTestId('confirm-delete');
      await confirmButton.click();

      await expect(trackItem).not.toBeVisible();
    });
  });
});
