using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Spawn : MonoBehaviour
{

    public GameObject[] burbujas;
    public Transform[] posiciones;

    public Manager manager;
    public float time = 4f;
    public float speed = 100f;

    List<GameObject> hijos;
    void Start()
    {
        //InvokeRepeating("Burbujitas", 0.5f, time);

        hijos = new List<GameObject>();
        StartCoroutine("Burbujitas");
    }

    // Update is called once per frame
    //void Burbujitas()
    //{
    //    if(manager.contador>0)
    //    {
    //        GameObject bubble = Instantiate(burbujas[Random.Range(0, burbujas.Length)], posiciones[Random.Range(0, posiciones.Length)]);
    //        bubble.transform.SetParent(this.transform);

    //        AgregaFuerza(bubble);

    //        Destroy(bubble, 20f);
    //    }


    //}

    public void Explotan()
    {
      
        for (int i = 0; i < transform.childCount; i++)
        {
           hijos.Add(transform.GetChild(i).gameObject);
        }

        foreach (GameObject a in hijos)
        {
            a.GetComponent<BurbujasFuncion>().Byebye();
        }
        hijos.Clear();
    }


    IEnumerator Burbujitas()
    {
        while (true)
        {
           if(manager.contador>0)
            {
                GameObject bubble = Instantiate(burbujas[Random.Range(0, burbujas.Length)], posiciones[Random.Range(0, posiciones.Length)]);
                bubble.transform.SetParent(this.transform);

                AgregaFuerza(bubble);

                Destroy(bubble, 20f);

            }


            yield return new WaitForSeconds(time);
        }

    }


    void AgregaFuerza(GameObject a)
    {
        float force = 10f;
        Vector2 forceP= new Vector2();
        float xForce = Random.Range(-force, force);

        if(a.GetComponent<BurbujasFuncion>().tache)
        {
             forceP = new Vector2(xForce, speed*2);
        }
        else
             forceP = new Vector2(xForce, speed);


        a.GetComponent<Rigidbody2D>().velocity = forceP;
    }
}
