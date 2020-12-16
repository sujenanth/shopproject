package ch.stnb.backend.Service;

import ch.stnb.backend.model.Item;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {
    private List<Item> items = new ArrayList<Item>();

    public ItemService(List<Item> items) {
        this.items = items;
    }

    public ItemService() {
        this.items = new ArrayList<>();
        items.add(new Item("1", "IPhone 1332", 3000.00, "https://upload.wikimedia.org/wikipedia/commons/3/3e/IPhone_12_Pro_Gold.svg"));
        items.add(new Item("2", "Huawei Pidk", 2000.00, "https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/kv/phones/p40-pro/silver/silver.png"));
        items.add(new Item("3", "Samsung S29", 1000.00, "https://www.mytrendyphone.ch/images/Puro-0-3-Nude-TPU-Case-for-Samsung-Galaxy-S20-Ultra-transparent-8033830288449-28012020-01-p.jpg"));
        items.add(new Item("4","Nokia X2029", 500.0, "https://images.ctfassets.net/wcfotm6rrl7u/PwAjFBx3W0M06kq8cae6o/f48eae222afb8aa63de7d4c1b7b069fd/nokia_3310-front_with_screen-grey_matte-307x700.jpg?fm=jpg&fl=progressive&bg=rgb:FFFFFF&q=60"));
        items.add(new Item("5", "SONY Kopfhörer",300.00,"https://images.preisvergleich.ch/-1/x3049/iceCatProduct_61034908-0_pic-Sony-WH-1000XM3-Schwarz-Ohrumschlie-end-Kopfband-Kopfh-rer.webp"));
        items.add(new Item("6","Cyrus CM 8 - Solid",30000.0,"https://static.digitecgalaxus.ch/Files/1/0/2/4/7/1/0/5/6bb977e4-39ad-4515-9973-6dec291967b2T.png?impolicy=ProductTileImage&resizeWidth=2798&resizeHeight=2798&resizeType=downsize&quality=high&cropWidth=0&cropHeight=0"));
        items.add(new Item("7", "IceCream Handyhülle",34.85,"https://ct-res.cloudinary.com/images/f_auto,q_auto:good,w_500/images/101ee67739c0ad52c79055b53c577cf8/iphoria-handyhuelle-iphone-7-8-114890.jpg"));
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public void addItem(Item i) {
        this.items.add(i);
    }

}
