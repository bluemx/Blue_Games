using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DestruirBolitasSolas : MonoBehaviour
{
    public List<GameObject> poswithchildren;
    private GameObject currentgo;
    private Collider2D[] currentgocolliders;
    private float currentgoDistance = 0;
    private int layerIndex;
    private LayerMask layerMsk;
    // Start is called before the first frame update
    void Start()
    {
        // Call UpdateBolitas every second
        InvokeRepeating("UpdateBolitas", 0f, 1f);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void UpdateBolitas ()
    {
        layerIndex = LayerMask.NameToLayer("Pos");
        layerMsk = LayerMask.GetMask("Pos");
        poswithchildren = new List<GameObject>();
        
        GameObject[] objectsInLayer = GameObject.FindObjectsOfType<GameObject>();

        foreach (GameObject obj in objectsInLayer)
        {
            if (obj.layer == layerIndex && obj.transform.childCount > 0)
            {
                poswithchildren.Add(obj);
            }
        }
        StartCoroutine(PrintNames());
    }
    IEnumerator PrintNames()
    {
        // Iterate through the list and print names with a delay of 0.05 seconds
        for (int i = 0; i < poswithchildren.Count; i++)
        {
            //Debug.Log(poswithchildren[i].name);
            currentgo = poswithchildren[i];
            FindVecinitos();
            yield return new WaitForSeconds(0.1f);
        }
    }
    void FindVecinitos ()
    {
        Collider2D myCollider = currentgo.GetComponent<Collider2D>();
        currentgoDistance = myCollider.bounds.size.x * 2.4f;
        currentgocolliders = Physics2D.OverlapCircleAll((Vector2)currentgo.transform.position, currentgoDistance, layerMsk);
        //Debug.Log(currentgo.name + " - Vecinitos: " + currentgocolliders.Length);
        
        bool hasAbove = false;
        int AboveItems = 0;
        for (int i = 0; i < currentgocolliders.Length; i++)
        {
            if(currentgocolliders[i].transform.position.y > currentgo.transform.position.y){
                AboveItems++;
                if(currentgocolliders[i].transform.childCount > 0){
                    hasAbove = true;
                }

            }
            //gameObjects[i] = colliders[i].gameObject;
        }

        if(!hasAbove && AboveItems>0){
            currentgo.transform.GetChild(0).GetComponent<Animator>().Play("Explota");
        }
    }
    void OnDrawGizmosSelected()
    {
        if(currentgo){
            Gizmos.color = Color.white;
            Gizmos.DrawWireSphere((Vector2)currentgo.transform.position, currentgoDistance);
        }
        
        if(currentgocolliders.Length>0){
            for (int i = 0; i < currentgocolliders.Length; i++)
            {
                Gizmos.color = Color.cyan;
                Gizmos.DrawWireSphere((Vector2)currentgocolliders[i].transform.position, 0.2f);
            }
        }
    }
}
