import PageTitle from '../components/pagetitle/PageTitle';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {setAccountStatus} from "../store/features/account/accountSlice";
import {selectAccountStatus} from "../store/features/account/accountSelectors";
import {useEffect} from "react";


DisonnectFiba.propTypes = {};


function DisonnectFiba() {
  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  }

  const dispatch = useDispatch();
  const accountStatus = useSelector(selectAccountStatus);

  const loggedOut = () => {
    dispatch(setAccountStatus(false));
  };

  // Trigger Fibarium Disconnect
  if (accountStatus) {
    loggedOut()
  }
  redirectUser("/")

  useEffect(() => {
    // Load initial value from local storage on component mount
    const storedAccountStatus = JSON.parse(localStorage.getItem('accountStatus'));
    if (storedAccountStatus !== null) {
      dispatch(setAccountStatus(storedAccountStatus));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save the boolean value to local storage whenever it changes
    localStorage.setItem('accountStatus', JSON.stringify(accountStatus));
  }, [accountStatus]);


  return (
    <div>
      <PageTitle none='none' title='Logout'/>

      <section className="tf-add-nft">
        <div className="tf-container">
          <div className="row">
            <div className="col-6">
              <div>Disconnect Fibarium</div>
            </div>
            <div className="col-xl-9 col-lg-8 ">
              <div className="add-nft-inner">
                {/*<h6 className="title">Injected Permissions</h6>*/}
                {/*<p className="sub"></p>*/}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default DisonnectFiba;