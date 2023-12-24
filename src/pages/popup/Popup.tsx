import '@pages/popup/Popup.css';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import withSuspense from '@src/shared/hoc/withSuspense';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';

const Popup = () => {
  return (
    <div>
      <Settings />
      <SearchBar />
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
