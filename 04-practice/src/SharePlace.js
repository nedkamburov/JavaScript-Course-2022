import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById('share-btn')
    this.map = null;

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
  }

  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
        this.map = new Map(coordinates);
    }

    this.shareBtn.disabled = false;
    const shareLinkInputElement = document.getElementById('share-link');
    shareLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    
  }

  sharePlaceHandler() {
    const shareLinkInputElement = document.getElementById('share-link');
    if (!navigator.clipboard) {
        shareLinkInputElement.select();
        return;
    }

    navigator.clipboard.writeText(shareLinkInputElement.value).then(()=>{
        alert('Copied into clipboard!');
    }).catch((err)=>{
        console.log(err);
        shareLinkInputElement.select();
    });
  }

  async locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a modern browser."
      );
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading location - please wait..."
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async successResult => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        this.selectPlace(coordinates, address);
        modal.hide();
      },
      errorResult => {
        modal.hide();
        alert("Could not locate you. Please enter an address manually.");
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid address. Please, try again!");
      return;
    } else {
      const modal = new Modal(
        "loading-modal-content",
        "Loading location - please wait..."
      );

      modal.show();
      try {
        const coords = await getCoordsFromAddress(address);
        this.selectPlace(coords, address);
      } catch (err) {
        alert(err.message);
      }
      modal.hide();
    }
  }
}

new PlaceFinder();
