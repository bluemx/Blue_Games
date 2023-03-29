using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestruirBolitas : MonoBehaviour
{
  
    public List<GameObject> list = new List<GameObject>();

    // Update is called once per frame
    void Update()
    {
        if(transform.childCount>0)
        {
            //Destruye();
        }
    }

    void Destruye()
    {
        for (int i = 0; i < transform.childCount; i++)
        {
            if (!list.Contains(gameObject.transform.GetChild(i).gameObject))
            {
                list.Add(gameObject.transform.GetChild(i).gameObject);
            }
        }

       if(list.Count==transform.childCount) 
       {
            for (int i = 0; i < list.Count; i++)
            {
                Destroy(transform.GetChild(i));

            }

            if(transform.childCount==0) 
            {
                list.Clear();
            }
       }


    }
}
