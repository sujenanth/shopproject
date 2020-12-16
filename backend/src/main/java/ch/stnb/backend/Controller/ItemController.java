package ch.stnb.backend.Controller;

import ch.stnb.backend.Service.ItemService;
import ch.stnb.backend.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("api/getItems")
    public List<Item> testVoid(){
        System.out.println(itemService.getItems());
        return itemService.getItems();
    }
}
