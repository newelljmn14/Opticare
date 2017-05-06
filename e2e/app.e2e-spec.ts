import { OpticarePage } from './app.po';

describe('opticare App', () => {
  let page: OpticarePage;

  beforeEach(() => {
    page = new OpticarePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
