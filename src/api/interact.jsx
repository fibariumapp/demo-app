import bops from "bops";

const getBaseUrl = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;

  return `${protocol}//${host}`;
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "requestAccounts",  // 'eth_requestAccounts' - for MetaMask
        source: getBaseUrl(),
        nonce: Math.random().toString(36).substring(7)
      });
      return {
        status: "connected",
        message: "Fibarium successfully connected.",
        address: addressArray[0],
        installed: true
      };
    } catch (err) {
      return {
        status: "error",
        message: "Something went wrong: " + err.message,
        address: "",
        installed: true
      };
    }
  } else {
    return {
      status: "error",
      message: (
        <span>
          <p>
            <a target="_blank" rel="noreferrer" href={`https://fibarium.com`}>
              You must install Fibarium in your browser.
            </a>
          </p>
        </span>
      ),
      address: "",
      installed: false
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "accounts",  // 'eth_accounts' - for MetaMask
        source: getBaseUrl(),
        nonce: Math.random().toString(36).substring(7)
      });
      if (addressArray.length > 0) {
        return {
          status: "connected",
          message: "Fibarium successfully connected.",
          address: addressArray[0],
          installed: true
        };
      } else {
        return {
          status: "pending",
          message: "The site is not connected to Fibarium",
          address: "",
          installed: true
        };
      }
    } catch (err) {
      return {
        status: "error",
        message: "Something went wrong: " + err.message,
        address: "",
        installed: true
      };
    }
  } else {
    return {
      status: "error",
      message: (
        <span>
          <p>
            <a target="_blank" rel="noreferrer" href={`https://fibarium.com`}>
              You must install Fibarium in your browser.
            </a>
          </p>
        </span>
      ),
      address: "",
      installed: false
    };
  }
};

export async function signMessage(account, message) {
  try {
    const from = account;
    const msg = `0x${bops.from(message, 'utf8').toString('hex')}`;

    const sign = await window.ethereum.request({
      method: 'personalSign',  // 'personal_sign' - for MetaMask
      params: [msg, from, Math.random().toString(36).substring(4)],
      source: getBaseUrl(),
      nonce: Math.random().toString(36).substring(7)
    });
    return {
      status: "signed",
      message: "Signed successfully",
      sign: sign,
    }
  } catch (err) {
    return {
      status: "error",
      message: err.message,
      sign: "",
    }
  }
}

export const getPermissions = async (account) => {
  if (window.ethereum) {
    try {
      const permissionsArray = await window.ethereum.request({
        method: "getPermissions",
        params: [account],
        source: getBaseUrl(),
        nonce: Math.random().toString(36).substring(7)
      });
      return {
        status: "approved",
        message: "Permissions approved",
        permissions: permissionsArray,
        installed: true
      };
    } catch (err) {
      return {
        status: "error",
        message: "Something went wrong: " + err.message,
        permissions: [],
        installed: true
      };
    }
  } else {
    return {
      status: "error",
      message: (
        <span>
          <p>
            <a target="_blank" rel="noreferrer" href={`https://fibarium.com`}>
              You must install Fibarium in your browser.
            </a>
          </p>
        </span>
      ),
      permissions: [],
      installed: false
    };
  }
}
