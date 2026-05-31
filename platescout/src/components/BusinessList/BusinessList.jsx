import './BusinessList.css';
import Business from '../Business/Business.jsx';


function BusinessList ({ businesses }) {
  return (
    // change to Map() later
    <div className="BusinessList">
      {businesses.map((business, index) => (
        <Business key={index} business={business}/>
      ))}
    </div>
  )
}

export default BusinessList;
