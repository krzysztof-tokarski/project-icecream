import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('placeholder test', async () => {
    const component = await render(AppComponent);

    expect(component).toBeDefined();
  });
});
