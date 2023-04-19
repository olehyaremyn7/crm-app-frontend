import { environment } from "src/environments/environment";

import { getImagePath } from "..";

describe('Utils', () => {
  describe('getImagePath()', () => {
    it('should return correct image path', () => {
      const { API_ENDPOINT } = environment;
      const imagePath = 'test-image-path'

      expect(getImagePath(imagePath)).toEqual(`${API_ENDPOINT}/${imagePath}`)
    })
  })
});
