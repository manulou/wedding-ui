import { WeddingUiPage } from './app.po';

describe('wedding-ui App', function() {
  let page: WeddingUiPage;

  beforeEach(() => {
    page = new WeddingUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
