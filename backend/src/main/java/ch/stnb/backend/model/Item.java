package ch.stnb.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    private String name;
    private double price;
    private String imagepage;

    public Item(String id, String name, double price, String imagepage) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imagepage = imagepage;
    }

    public Item(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }


    public Item(){

    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImagepage() {
        return imagepage;
    }

    public void setImagepage(String imagepage) {
        this.imagepage = imagepage;
    }
}
