import { CoevalsystemPage } from './app.po';

describe('coevalsystem App', function() {
  let page: CoevalsystemPage;

  beforeEach(() => {
    page = new CoevalsystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
