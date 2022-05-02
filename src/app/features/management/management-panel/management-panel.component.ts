import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'icy-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPanelComponent implements OnInit {
  public async ngOnInit() {
    const docSnap = await getDoc(doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2'));
    // todo

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      // const userFromStorage = localStorage.getItem('user');
      // const userWithDb = { user: userFromStorage, data: docSnap.data() };
      localStorage.setItem('user', JSON.stringify(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }
}
