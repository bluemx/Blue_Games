using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MeElimino : MonoBehaviour
{
    public List<GameObject> vecinitos;
    public int cont = 0;
    public bool bandera = false;
    public List<GameObject> vecinitosArriba;
    public List<GameObject> vecinitosLaterales;

    // Start is called before the first frame update
    void Start()
    {
        vecinitos = new List<GameObject>();
    }

    // Update is called once per frame
    void Update()
    {
        if(!bandera)
        {            
            if (transform.childCount > 0 && gameObject.tag != "techo")
            {
                
                //BuscoVecinos();
                
            }
            else
            {
                //vecinitos.Clear();
                //vecinitos = new List<GameObject>();
            }

            bandera = true;
        }

    }


    public void BYE()
    {
        transform.GetChild(0).GetComponent<Animator>().Play("Explota");
    }

    void BuscoVecinos()
    {
        cont = 0;
        

        for (int i=1;i<GetComponent<Vecinos>().vecinosGrafo.Count;)
        {
            if (GetComponent<Vecinos>().vecinosGrafo[i].transform.childCount > 0)
            {
                
                if (!vecinitos.Contains(GetComponent<Vecinos>().vecinosGrafo[i]))
                {
                    vecinitos.Add(GetComponent<Vecinos>().vecinosGrafo[i]);
                }
                i++;

            }
            else
            {
                cont++;
                i++;
               
            }
            
            
        }


        if (vecinitos.Count > 0)
        {
            foreach (GameObject item in vecinitos)
            {
                if (item.gameObject.tag == "techo")
                {
                    
                    

                    break;
                }
                else 
                {
                    for (int i = 0; i < item.GetComponent<MeElimino>().vecinitos.Count; i++)
                    {
                        if (item.GetComponent<MeElimino>().vecinitos[i].gameObject == this.gameObject)
                            cont++;
                        

                    }
                }
            }
        }

        

        if (cont >= GetComponent<Vecinos>().vecinosGrafo.Count-1)
        {


            transform.GetChild(0).GetComponent<Animator>().Play("Explota");

            //transform.GetChild(0).gameObject.SetActive(false);

            cont = 0;
        }
    }
}
