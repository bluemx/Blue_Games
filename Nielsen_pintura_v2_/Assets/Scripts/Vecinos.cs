using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Vecinos : MonoBehaviour
{

    public List<GameObject> vecinos;
    public List<GameObject> vecinosActivos;
    public List<GameObject> vecinosGrafo;
    ManagerBolitas managerB;
    
    // Start is called before the first frame update
    void Start()
    {
        vecinos = new List<GameObject>();
        managerB = FindObjectOfType<ManagerBolitas>();
    }

    // Update is called once per frame
    void Update()
    {

       


        if (transform.childCount > 0)
        {


            
            if (!managerB.banderas)
            {

                BuscarColor();
            }
        }
        else if (transform.childCount == 0)
        {
            if(vecinos.Count > 0) 
            {
                //Debug.Log("Debo limpiarme " + gameObject.name);
                vecinos.Clear();
                vecinos = new List<GameObject>();
            }
            
        }
    }


    

    void BuscarColor()
    {
       
        foreach (GameObject a in vecinosActivos)
        {
            if(a.transform.childCount>0)
            {
                if(a.transform.GetChild(0).gameObject.tag== transform.GetChild(0).gameObject.tag)
                {
                    if(!vecinos.Contains(a))
                    {
                        vecinos.Add(a);
                        
                    }
                }
            }
        }
    }

    int Limpiar(string name)
    {
        int colorB = 0;
        switch (name)
        {
            case "Azul Cubeta":
                colorB = 0;
                break;
            case "Morado Cubeta":
                colorB = 3;
                break;
            case "Rojo Cubeta":
                colorB = 2;
                break;
            case "Amarillo Cubeta":
                colorB = 1;
                break;
        }
        return colorB;
    }

    
}
