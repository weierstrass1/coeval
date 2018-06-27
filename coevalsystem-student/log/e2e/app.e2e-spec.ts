import { LogPage } from './app.po';

describe('log App', function() {
  let page: LogPage;

  beforeEach(() => {
    page = new LogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
