import PropTypes from 'prop-types';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const statusClass = status.toLowerCase();
  return (
    <span className={`status-badge ${statusClass}`}>
      <span className="dot" /> {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusBadge;