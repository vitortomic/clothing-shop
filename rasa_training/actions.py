from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import logging

logger = logging.getLogger(__name__)

class ActionGetProductInfo(Action):

    def name(self) -> Text:
        return "action_get_product_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        product_name = tracker.get_slot('product_name')
        logger.debug(f"SLOTS:{tracker.slots}")
        logger.debug(f"Received product_name slot: {product_name}")

        if product_name is None:
            dispatcher.utter_message(text="Sorry, I didn't catch the product name.")
            return []

        products = [
            { 
            "id": 1, 
            "name": "Classic T-Shirt", 
            "price": 19.99, 
            "image": "https://cdn11.bigcommerce.com/s-hsi95a83fz/images/stencil/3000w/products/201/7118/5026_CLASSIC_TEE_BLACK_BACK__02656.1716493855.jpg?c=1", 
            "category": "T-Shirt", 
            "description": "A timeless classic T-Shirt made from high-quality cotton." 
            },
            { 
            "id": 2, 
            "name": "Slim Fit Jeans", 
            "price": 39.99, 
            "image": "https://assets.burberry.com/is/image/Burberryltd/FE2E1006-6A64-47B2-888C-2F97016FA4ED?$BBY_V3_SL_1$&wid=1501&hei=1500", 
            "category": "Jeans", 
            "description": "Stylish slim fit jeans that offer a modern look and comfortable feel." 
            },
            { 
            "id": 3, 
            "name": "Leather Jacket", 
            "price": 89.99, 
            "image": "https://t4.ftcdn.net/jpg/05/93/78/71/360_F_593787107_rbWfwMekCQcAdgxDHPhEioWATjdTEMHh.jpg", 
            "category": "Jacket", 
            "description": "A premium leather jacket that adds a touch of sophistication to any outfit." 
            },
            { 
            "id": 4, 
            "name": "Summer Dress", 
            "price": 29.99, 
            "image": "https://media02.stockfood.com/largepreviews/MzE4OTI1MzAz/10287913-Striped-black-and-white-summer-dress-on-white-background.jpg", 
            "category": "Dress", 
            "description": "A lightweight summer dress perfect for warm weather and casual outings." 
            },
            { 
            "id": 5, 
            "name": "Cargo Shorts", 
            "price": 24.99, 
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kRvyKTYpDHkeEMFNufvms2Y8x2q8UfPOVQ&s", 
            "category": "Shorts", 
            "description": "Practical cargo shorts with multiple pockets for convenience and style." 
            },
            { 
            "id": 6, 
            "name": "Hooded Sweatshirt", 
            "price": 49.99, 
            "image": "https://media.istockphoto.com/id/1142211733/photo/front-of-sweatshirt-with-hood-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=inMPwtP-ebqhXD9_A3bHETPkyC37x0rFNSLYgf6rLMM=", 
            "category": "Sweatshirt", 
            "description": "A cozy hooded sweatshirt perfect for chilly days and casual wear." 
            },
            { 
            "id": 7, 
            "name": "Formal Pants", 
            "price": 59.99, 
            "image": "https://st4.depositphotos.com/1226172/19675/i/450/depositphotos_196757006-stock-photo-light-grey-formal-mens-trousers.jpg", 
            "category": "Pants", 
            "description": "Elegant formal pants suitable for office wear and special occasions." 
            },
            { 
            "id": 8, 
            "name": "Winter Coat", 
            "price": 119.99, 
            "image": "https://st2.depositphotos.com/1559986/8934/i/950/depositphotos_89349778-stock-photo-fashion-winter-jacket-isolated-on.jpg", 
            "category": "Coat", 
            "description": "A warm and stylish winter coat to keep you comfortable in cold weather." 
            },
            { 
            "id": 9, 
            "name": "Polo Shirt", 
            "price": 25.99, 
            "image": "https://i.pinimg.com/474x/8a/0b/1e/8a0b1eda15f8aab343fd8ade6c2c92ce.jpg", 
            "category": "Shirt", 
            "description": "A classic polo shirt that combines comfort and style for everyday wear." 
            },
            { 
            "id": 10, 
            "name": "Casual Shorts", 
            "price": 19.99, 
            "image": "https://messinahembry.com/cdn/shop/files/bb70fddd-bc25-4263-9e79-a57b86afebc6.jpg?v=1690427152", 
            "category": "Shorts", 
            "description": "Comfortable casual shorts ideal for outdoor activities and lounging." 
            },
            { 
            "id": 11, 
            "name": "Denim Jacket", 
            "price": 69.99, 
            "image": "https://www.shutterstock.com/image-photo/blue-denim-jacket-isolated-over-600nw-310155074.jpg", 
            "category": "Jacket", 
            "description": "A versatile denim jacket that adds a cool touch to any outfit." 
            },
            { 
            "id": 12, 
            "name": "Graphic T-Shirt", 
            "price": 21.99, 
            "image": "https://image.spreadshirtmedia.com/image-server/v1/products/T691A228PA3867PT17X35Y41D1020483795W22943H22943CxFFFFFF/views/1,width=378,height=378,appearanceId=228,backgroundColor=F2F2F2,modelId=6009,crop=list/hockey-helmet-on-white-background.jpg", 
            "category": "T-Shirt", 
            "description": "A trendy graphic T-Shirt that showcases your unique style." 
            },
            { 
            "id": 13, 
            "name": "Linen Pants", 
            "price": 34.99, 
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvF_Gu1sLOZC2R3fVu9Kkdwk_QWYQ0cfCyaQ&s", 
            "category": "Pants", 
            "description": "Breathable linen pants perfect for warm weather and casual settings." 
            },
            { 
            "id": 14, 
            "name": "Sweater Dress", 
            "price": 49.99, 
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJh-UOgYDBTX9lQYahIcUSlmCvGC4CgV1hQ&s", 
            "category": "Dress", 
            "description": "A chic sweater dress that combines warmth and fashion effortlessly." 
            },
            { 
            "id": 15, 
            "name": "Track Jacket", 
            "price": 59.99, 
            "image": "https://img.freepik.com/premium-photo/red-white-combination-track-jacket-isolated-white-background_94628-24181.jpg", 
            "category": "Jacket", 
            "description": "A sporty track jacket ideal for workouts and casual wear." 
            },
            { 
            "id": 16, 
            "name": "Athletic Shorts", 
            "price": 19.99, 
            "image": "https://media.istockphoto.com/id/1067755322/photo/blank-sports-short-pants-color-white-front-view.jpg?s=612x612&w=0&k=20&c=XbplfmRx54q4tLe5WkURPI2D3QQ33xmvPmWWtUkYQbc=", 
            "category": "Shorts", 
            "description": "Lightweight athletic shorts designed for performance and comfort." 
            },
            { 
            "id": 17, 
            "name": "Button-Down Shirt", 
            "price": 35.99, 
            "image": "https://www.mensjournal.com/.image/t_share/MTk3MjA1NTU3MTg5Mjg5Mjc5/taylorstitchshirt1.jpg", 
            "category": "Shirt", 
            "description": "A versatile button-down shirt that works for both formal and casual occasions." 
            },
            { 
            "id": 18, 
            "name": "Wool Coat", 
            "price": 149.99, 
            "image": "https://st.mngbcn.com/rcs/pics/static/T5/fotos/S20/57025948_09_B.jpg?ts=1685029017340&imwidth=360&imdensity=2", 
            "category": "Coat", 
            "description": "A luxurious wool coat that provides warmth and style during winter." 
            },
            { 
            "id": 19, 
            "name": "V-Neck Sweater", 
            "price": 29.99, 
            "image": "https://i.pinimg.com/736x/7c/41/1f/7c411f53c5c3a12fdc2babf22d854597.jpg", 
            "category": "Sweater", 
            "description": "A comfortable V-neck sweater perfect for layering and staying cozy." 
            },
            { 
            "id": 20, 
            "name": "Skinny Jeans", 
            "price": 49.99, 
            "image": "https://i.pinimg.com/736x/aa/fa/ce/aafacead4de0b5e7207b794fed0e9bc0.jpg", 
            "category": "Jeans", 
            "description": "Trendy skinny jeans that offer a sleek and modern look." 
            }
        ]

        product_info = next((product for product in products if product['name'].lower() == product_name.lower()), None)

        if product_info:
            dispatcher.utter_message(
                text=f"Here are the details for {product_name}: ID - {product_info['id']}, Description - {product_info['description']}, Price - {product_info['price']}"
            )
        else:
            dispatcher.utter_message(text=f"Sorry, I couldn't find details for {product_name}.")

        return []


class ActionAddToCart(Action):

    def name(self) -> Text:
        return "action_add_to_cart"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        product_name = tracker.get_slot('product_name')
        logger.debug(f"SLOTS: {tracker.slots}")
        logger.debug(f"Received product_name slot: {product_name}")

        if not product_name:
            dispatcher.utter_message(text="Sorry, I didn't catch the product name.")
            return []

        products = [
            { 
            "id": 1, 
            "name": "Classic T-Shirt", 
            "price": 19.99, 
            "image": "https://cdn11.bigcommerce.com/s-hsi95a83fz/images/stencil/3000w/products/201/7118/5026_CLASSIC_TEE_BLACK_BACK__02656.1716493855.jpg?c=1", 
            "category": "T-Shirt", 
            "description": "A timeless classic T-Shirt made from high-quality cotton." 
            },
            { 
            "id": 2, 
            "name": "Slim Fit Jeans", 
            "price": 39.99, 
            "image": "https://assets.burberry.com/is/image/Burberryltd/FE2E1006-6A64-47B2-888C-2F97016FA4ED?$BBY_V3_SL_1$&wid=1501&hei=1500", 
            "category": "Jeans", 
            "description": "Stylish slim fit jeans that offer a modern look and comfortable feel." 
            },
            { 
            "id": 3, 
            "name": "Leather Jacket", 
            "price": 89.99, 
            "image": "https://t4.ftcdn.net/jpg/05/93/78/71/360_F_593787107_rbWfwMekCQcAdgxDHPhEioWATjdTEMHh.jpg", 
            "category": "Jacket", 
            "description": "A premium leather jacket that adds a touch of sophistication to any outfit." 
            },
            { 
            "id": 4, 
            "name": "Summer Dress", 
            "price": 29.99, 
            "image": "https://media02.stockfood.com/largepreviews/MzE4OTI1MzAz/10287913-Striped-black-and-white-summer-dress-on-white-background.jpg", 
            "category": "Dress", 
            "description": "A lightweight summer dress perfect for warm weather and casual outings." 
            },
            { 
            "id": 5, 
            "name": "Cargo Shorts", 
            "price": 24.99, 
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kRvyKTYpDHkeEMFNufvms2Y8x2q8UfPOVQ&s", 
            "category": "Shorts", 
            "description": "Practical cargo shorts with multiple pockets for convenience and style." 
            },
            { 
            "id": 6, 
            "name": "Hooded Sweatshirt", 
            "price": 49.99, 
            "image": "https://media.istockphoto.com/id/1142211733/photo/front-of-sweatshirt-with-hood-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=inMPwtP-ebqhXD9_A3bHETPkyC37x0rFNSLYgf6rLMM=", 
            "category": "Sweatshirt", 
            "description": "A cozy hooded sweatshirt perfect for chilly days and casual wear." 
            },
            { 
            "id": 7, 
            "name": "Formal Pants", 
            "price": 59.99, 
            "image": "https://st4.depositphotos.com/1226172/19675/i/450/depositphotos_196757006-stock-photo-light-grey-formal-mens-trousers.jpg", 
            "category": "Pants", 
            "description": "Elegant formal pants suitable for office wear and special occasions." 
            },
            { 
            "id": 8, 
            "name": "Winter Coat", 
            "price": 119.99, 
            "image": "https://st2.depositphotos.com/1559986/8934/i/950/depositphotos_89349778-stock-photo-fashion-winter-jacket-isolated-on.jpg", 
            "category": "Coat", 
            "description": "A warm and stylish winter coat to keep you comfortable in cold weather." 
            },
            { 
            "id": 9, 
            "name": "Polo Shirt", 
            "price": 25.99, 
            "image": "https://i.pinimg.com/474x/8a/0b/1e/8a0b1eda15f8aab343fd8ade6c2c92ce.jpg", 
            "category": "Shirt", 
            "description": "A classic polo shirt that combines comfort and style for everyday wear." 
            },
            { 
            "id": 10, 
            "name": "Casual Shorts", 
            "price": 19.99, 
            "image": "https://messinahembry.com/cdn/shop/files/bb70fddd-bc25-4263-9e79-a57b86afebc6.jpg?v=1690427152", 
            "category": "Shorts", 
            "description": "Comfortable casual shorts ideal for outdoor activities and lounging." 
            },
            { 
            "id": 11, 
            "name": "Denim Jacket", 
            "price": 69.99, 
            "image": "https://www.shutterstock.com/image-photo/blue-denim-jacket-isolated-over-600nw-310155074.jpg", 
            "category": "Jacket", 
            "description": "A versatile denim jacket that adds a cool touch to any outfit." 
            },
            { 
            "id": 12, 
            "name": "Graphic T-Shirt", 
            "price": 21.99, 
            "image": "https://image.spreadshirtmedia.com/image-server/v1/products/T691A228PA3867PT17X35Y41D1020483795W22943H22943CxFFFFFF/views/1,width=378,height=378,appearanceId=228,backgroundColor=F2F2F2,modelId=6009,crop=list/hockey-helmet-on-white-background.jpg", 
            "category": "T-Shirt", 
            "description": "A trendy graphic T-Shirt that showcases your unique style." 
            },
            { 
            "id": 13, 
            "name": "Linen Pants", 
            "price": 34.99, 
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvF_Gu1sLOZC2R3fVu9Kkdwk_QWYQ0cfCyaQ&s", 
            "category": "Pants", 
            "description": "Breathable linen pants perfect for warm weather and casual settings." 
            },
            { 
            "id": 14, 
            "name": "Sweater Dress", 
            "price": 49.99, 
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJh-UOgYDBTX9lQYahIcUSlmCvGC4CgV1hQ&s", 
            "category": "Dress", 
            "description": "A chic sweater dress that combines warmth and fashion effortlessly." 
            },
            { 
            "id": 15, 
            "name": "Track Jacket", 
            "price": 59.99, 
            "image": "https://img.freepik.com/premium-photo/red-white-combination-track-jacket-isolated-white-background_94628-24181.jpg", 
            "category": "Jacket", 
            "description": "A sporty track jacket ideal for workouts and casual wear." 
            },
            { 
            "id": 16, 
            "name": "Athletic Shorts", 
            "price": 19.99, 
            "image": "https://media.istockphoto.com/id/1067755322/photo/blank-sports-short-pants-color-white-front-view.jpg?s=612x612&w=0&k=20&c=XbplfmRx54q4tLe5WkURPI2D3QQ33xmvPmWWtUkYQbc=", 
            "category": "Shorts", 
            "description": "Lightweight athletic shorts designed for performance and comfort." 
            },
            { 
            "id": 17, 
            "name": "Button-Down Shirt", 
            "price": 35.99, 
            "image": "https://www.mensjournal.com/.image/t_share/MTk3MjA1NTU3MTg5Mjg5Mjc5/taylorstitchshirt1.jpg", 
            "category": "Shirt", 
            "description": "A versatile button-down shirt that works for both formal and casual occasions." 
            },
            { 
            "id": 18, 
            "name": "Wool Coat", 
            "price": 149.99, 
            "image": "https://st.mngbcn.com/rcs/pics/static/T5/fotos/S20/57025948_09_B.jpg?ts=1685029017340&imwidth=360&imdensity=2", 
            "category": "Coat", 
            "description": "A luxurious wool coat that provides warmth and style during winter." 
            },
            { 
            "id": 19, 
            "name": "V-Neck Sweater", 
            "price": 29.99, 
            "image": "https://i.pinimg.com/736x/7c/41/1f/7c411f53c5c3a12fdc2babf22d854597.jpg", 
            "category": "Sweater", 
            "description": "A comfortable V-neck sweater perfect for layering and staying cozy." 
            },
            { 
            "id": 20, 
            "name": "Skinny Jeans", 
            "price": 49.99, 
            "image": "https://i.pinimg.com/736x/aa/fa/ce/aafacead4de0b5e7207b794fed0e9bc0.jpg", 
            "category": "Jeans", 
            "description": "Trendy skinny jeans that offer a sleek and modern look." 
            }
        ]

        product_info = next((product for product in products if product['name'].lower() == product_name.lower()), None)

        if product_info:
            dispatcher.utter_message(
                text=f"{product_name} has been added to your cart.",
                json_message={"product_id": product_info['id'], "action": "add_to_cart"}
                
            )
        else:
            dispatcher.utter_message(text=f"Sorry, I couldn't find {product_name} to add to your cart.")

        return []