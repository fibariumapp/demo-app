import React, {useEffect, useState} from 'react';
import PageTitle from '../components/pagetitle/PageTitle';

import {useNavigate} from 'react-router-dom';
import {connectWallet, getCurrentWalletConnected, signMessage} from "../api/interact";
import {useDispatch, useSelector} from "react-redux";
import {setAccountStatus} from "../store/features/account/accountSlice";
import {selectAccountStatus} from "../store/features/account/accountSelectors";


ConnectFiba.propTypes = {};


function ConnectFiba() {
  const navigate = useNavigate();
  const redirectUser = (path) => {
    navigate(path);
  }

  const redirectUserLazy = (path, sec) => {
    setTimeout(() => {
      navigate(path);
    }, sec * 1000); // 1000 milliseconds = 1 second
  }

  const dispatch = useDispatch();
  const accountStatus = useSelector(selectAccountStatus);

  const loggedIn = () => {
    dispatch(setAccountStatus(true));
  };

  const [fibariumInstalled, setFibariumInstalled] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [statusConnectSite, setStatusConnectSite] = useState("");
  const [messageConnectSite, setMessageConnectSite] = useState("");
  const [statusSignRequest, setStatusSignRequest] = useState("");
  const [messageSignRequest, setMessageSignRequest] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    async function getExistingWallet() {
      const {status, message, address, installed} = await getCurrentWalletConnected();

      setStatusConnectSite(status)
      setMessageConnectSite(message)
      setWallet(address);
      setFibariumInstalled(installed);
    }

    getExistingWallet().then();
  }, []);

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

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatusConnectSite(walletResponse.status)
    setMessageConnectSite(walletResponse.message)
    setWallet(walletResponse.address);
  };

  const loginButtonPressed = async () => {
    const message_str = "Welcome to demo-site.com!\n" +
      "This request will not trigger a blockchain transaction or cost any gas fees."
    try {
      const signMessageResponse = await signMessage(walletAddress, message_str)
      setStatusSignRequest(signMessageResponse.status)
      setMessageSignRequest(signMessageResponse.message)
    } catch (err) {
      setLoginStatus("Login failed:" + err)
    }
  }

  // Trigger Fibarium Connect
  if (accountStatus) {
    redirectUser("/dashboard")
  } else {
    if (fibariumInstalled) {
      switch (statusConnectSite) {
        case "connected":
          console.log('CONNECT SITE CONNECTED')
          switch (statusSignRequest) {
            case "signed":
              console.log('SIGN REQUEST SIGNED')
              loggedIn()
              redirectUser("/dashboard")
              break;
            case "error":
              console.log('SIGN REQUEST ERROR')
              redirectUserLazy("/", 6)
              break;
            default:
              console.log('SIGN REQUEST PENDING')
              loginButtonPressed().then().catch((err) => {
                console.log('loginButtonPressed err', err)
              })
          }
          break;
        case "error":
          console.log('CONNECT SITE ERROR')
          redirectUserLazy("/", 6)
          break;
        default:
          console.log('CONNECT SITE PENDING')
          connectWalletPressed().then().catch((err) => {
            console.log('connectWalletPressed err', err)
          })
          break;
      }
    } else {
      console.log('FIBARIUM NOT INSTALLED')
    }
  }


  return (
    <div>
      <PageTitle none='none' title='Login with Fibarium'/>

      <section className="tf-add-nft">
        <div className="tf-container">
          <div className="row">
            <div className="col-6">
              <div>{messageConnectSite}</div>
              {fibariumInstalled && walletAddress.length > 0 && (
                "Connected Address: " + walletAddress
              )}
              <p>{messageSignRequest}</p>
              <p>{loginStatus}</p>
              {fibariumInstalled && (statusConnectSite === "error" || statusSignRequest === "error") ?
                <p>You will be redirected to home page in 6 seconds</p> : <p/>}
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

export default ConnectFiba;