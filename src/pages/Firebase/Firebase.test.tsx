import { Route, Router } from '@solidjs/router';
import { render, screen } from '@solidjs/testing-library';
import { Firebase } from '@/pages/Firebase';

describe('firebase page', () => {
  it('displays firebase page title', () => {
    render(() => (
      <Router>
        <Route component={Firebase} />
      </Router>
    ));
    expect(screen.getByText('Castles of Burgundy')).toBeInTheDocument();
  });
});
