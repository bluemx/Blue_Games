using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Spawn : MonoBehaviour
{

    public GameObject[] burbujas;
    

    void Start()
    {
        InvokeRepeating("Burbujitas", 1f, 5f);
    }

    // Update is called once per frame
    void Burbujitas()
    {
        GameObject bubble = Instantiate(burbujas[Random.Range(0, burbujas.Length)],this.transform);
        bubble.transform.SetParent(this.transform);

        Destroy(bubble, 20f);
    }
}
