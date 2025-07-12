document.addEventListener('DOMContentLoaded', () => {
   
    initMenuToggle();
    
   
    initAccordion();
    
  
    initBidSystem();
    
   
    initBuyNowButton();
});


function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (!menuToggle || !menu) return;
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
       
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}


function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
          
            const isActive = item.classList.contains('active');
            
           
            accordionItems.forEach(accordionItem => {
                accordionItem.classList.remove('active');
            });
            
           
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}


function initBidSystem() {
    const bidButtons = document.querySelectorAll('.bid-btn');
    const bidModal = document.getElementById('bidModal');
    
    if (!bidButtons.length || !bidModal) return;
    
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modal-nft-image');
    const modalName = document.getElementById('modal-nft-name');
    const modalPrice = document.getElementById('modal-nft-price');
    const nftIdInput = document.getElementById('nft-id');
    const bidForm = document.getElementById('bid-form');
 
    bidButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nftId = button.getAttribute('data-id');
            const nftName = button.getAttribute('data-name');
            const nftPrice = button.getAttribute('data-price');
            const nftImage = button.closest('.nft-image').querySelector('img').src;
            
            
            modalImage.src = nftImage;
            modalName.textContent = nftName;
            modalPrice.textContent = nftPrice;
            nftIdInput.value = nftId;
            
            
            bidModal.style.display = 'block';
            
           
            document.body.style.overflow = 'hidden';
        });
    });
    
  
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            bidModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
   
    window.addEventListener('click', (event) => {
        if (event.target === bidModal) {
            bidModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
  
    if (bidForm) {
        bidForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const bidAmount = document.getElementById('bid-amount').value;
            const walletAddress = document.getElementById('wallet-address').value;
            const nftId = nftIdInput.value;
            
            
            if (!bidAmount || !walletAddress) {
                alert('Please fill in all fields');
                return;
            }
            
           
            saveBidData(nftId, nftName.textContent, bidAmount, walletAddress);
            
            
            alert(`Bid of ${bidAmount} ETH placed successfully!`);
            
            
            bidModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            
            bidForm.reset();
        });
    }
}


function saveBidData(nftId, nftName, bidAmount, walletAddress) {
  
    const existingBids = JSON.parse(localStorage.getItem('nftBids')) || [];
    
  
    const newBid = {
        id: Date.now(), 
        nftId: nftId,
        nftName: nftName,
        bidAmount: bidAmount,
        walletAddress: walletAddress,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
   
    existingBids.push(newBid);
    
  
    localStorage.setItem('nftBids', JSON.stringify(existingBids));
}


function initBuyNowButton() {
    const buyBtn = document.getElementById('buyNowBtn');
    const feedback = document.getElementById('buyFeedback');

    if (!buyBtn) return;

    buyBtn.addEventListener('click', function() {
        
        feedback.textContent = "Purchase successful! You now own this item.";
        buyBtn.disabled = true;
        buyBtn.textContent = "Purchased";
    });
}


document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        
        const currentPrice = parseFloat(this.closest('.crds').querySelector('.bd').textContent);
        let bidAmount = prompt(`Enter your bid (must be greater than ${currentPrice} ETH):`);
        
        if (bidAmount && !isNaN(bidAmount)) {
            bidAmount = parseFloat(bidAmount);
            if (bidAmount > currentPrice) {
                alert(`Bid of ${bidAmount} ETH placed successfully!`);
               
                this.textContent = "BID PLACED";
                this.disabled = true;
                this.style.backgroundColor = "#4CAF50";
            } else {
                alert(`Your bid must be greater than ${currentPrice} ETH.`);
            }
        } else {
            alert('Please enter a valid number.');
        }
    });
});