using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.Collections.Generic;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Stripe.Checkout;
using smidigAPI.Service;
using smidigAPI.Collection;

namespace YourNamespace.Controllers
{
    // The PaymentController connects to the Stripe-API to add payments to our website
    [ApiController]
    [Route("api/payment")]
    public class PaymentController : ControllerBase
    {
        private readonly StoreService _storeService; 
        private const string StripeSecretKey = "sk_test_51NGdW9I01YhOsco0IyklFoDDEMMapDdl7rI3k3LasXLVjOQPD3vlFVoRoT9V4J4XEjGpgLyNrpO9iCUI48V2Khsk00EitnTw8K";

        public PaymentController(StoreService storeService) 
        {
            _storeService = storeService; 
        }

        [HttpPost]
        [Route("create-checkout-session")]
        public ActionResult CreateTest([FromBody] CreateTestRequest request) 
        {
            StripeConfiguration.ApiKey = StripeSecretKey;

            if (string.IsNullOrEmpty(request.ItemId))
            {
            return BadRequest("ItemId is required.");
            }
  
            StoreItem? item = _storeService.GetById(request.ItemId);

            if(item == null) {
                return BadRequest("Invalid itemId provided.");
            }
            
            var domain = "http://localhost:3000";
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long?)(item.price * 100), 
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = item.title, 
                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = domain + "/store/shopItems?session_id={CHECKOUT_SESSION_ID}", 
                CancelUrl = domain + "/store/shopItems",
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return new JsonResult(session);

        }
    }

    public class CreateTestRequest
    {
        public string? ItemId { get; set; }
    }


    public class PaymentIntentRequest
    {
        public int Amount { get; set; }
    }
}