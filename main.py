from tkinter import *
import numpy as np


def ex1():

    tuplesA1 = ((int(globals()['e1'].get())), (int(globals()['e2'].get())))
    tuplesA2 = ((int(globals()['e3'].get())), (int(globals()['e4'].get())))

    tuplesB1 = ((int(globals()['e5'].get())), (int(globals()['e6'].get())))
    tuplesB2 = ((int(globals()['e7'].get())), (int(globals()['e8'].get())))

    strategyA = np.array([tuplesA1, tuplesA2])
    strategyB = np.array([tuplesB1, tuplesB2])

    zero_sum()
    pure_nash(strategyA=strategyA, strategyB=strategyB)
    mixed_nash(strategyA=strategyA, strategyB=strategyB)


def pure_nash(strategyA, strategyB):
    nashArr = []

    def check_nash(i, j):
        for k in range(2):
            if strategyA[k][j] > strategyA[i][j]:
                return True
        for k in range(2):
            if strategyB[i][k] > strategyB[i][j]:
                return True
        return False

    for i in range(2):
        for j in range(2):
            result = check_nash(i, j)
            if result == False:
                nashArr.append(i)
                nashArr.append(j)
                print(i, ',', j)

    if nashArr:
        resultNashStr = ""
        for i in range(0, len(nashArr), 2):
            resultNashStr += "(" + str(nashArr[i]) + "," + str(
                nashArr[i + 1]) + ")"
        nashResultLabel = Label(
            root,
            text="Pure Nash result for player A and Player B" +
            resultNashStr).grid(row=7, column=3)
    else:
        nashResultLabel = Label(root, text="No Pure Nash result found").grid(
            row=7, column=3)


def mixed_nash(strategyA, strategyB):
    # find mixed Nash
    probabilityA = (-strategyB[1][0] + strategyB[1][1]) / (
        strategyB[0][0] - strategyB[1][0] - strategyB[0][1] + strategyB[1][1])
    probabilityB = (-strategyA[0][1] + strategyA[1][1]) / (
        strategyA[0][0] - strategyA[0][1] - strategyA[1][0] + strategyA[1][1])

    if probabilityA >= 1 or probabilityA <= 0:
        print(
            "Can't find mixed strategy for player A because player B has dominated strategy"
        )
        ind = np.unravel_index(np.argmax(strategyB, axis=None),
                               strategyB.shape)
        print("Player B dominant strategy:", ind[1])
    else:
        print("Mixed strategy player A:\n", [probabilityA, 1 - probabilityA])

    if probabilityB >= 1 or probabilityB <= 0:
        print(
            "Can't find mixed strategy for player B because player A has dominated strategy"
        )
        ind = np.unravel_index(np.argmax(strategyA, axis=None),
                               strategyA.shape)
        print("Player A dominant strategy:", ind[0])
    else:
        print("Mixed strategy player B:\n", [probabilityB, 1 - probabilityB])


def zero_sum():
    count = 0
    s1 = []
    s2 = []
    s1.append(int(e1.get()))
    s1.append(int(e3.get()))
    s1.append(int(e5.get()))
    s1.append(int(e7.get()))

    s2.append(int(e2.get()))
    s2.append(int(e4.get()))
    s2.append(int(e6.get()))
    s2.append(int(e8.get()))

    for e in range(4):
        if (s1[e] + s2[e] == 0):
            count += 1
    if count == 4:
        zeroSumLabel = Label(root, text="Zero Sum").grid(row=6, column=3)
    else:
        zeroSumLabel = Label(root, text="Not Zero Sum").grid(row=6, column=3)


root = Tk()

frame1 = Frame()
frame2 = Frame()

playerA = Label(root, text="Player 2", borderwidth=2,
                relief="groove").grid(row=0, column=3)
playerB = Label(root, text="Player 1", borderwidth=2,
                relief="groove").grid(row=3, column=0)
uLabel = Label(root, text="u", relief='solid', borderwidth=2).grid(row=1,
                                                                   column=2)
vLabel = Label(root, text="v", borderwidth=2, relief="solid").grid(row=1,
                                                                   column=4)
xLabel = Label(root, text="x", borderwidth=2, relief="solid").grid(row=3,
                                                                   column=1)
yLabel = Label(root, text="y", borderwidth=2, relief="solid").grid(row=4,
                                                                   column=1)

e1 = Entry(root)
e1.grid(row=3, column=2)

e2 = Entry(root)
e2.grid(row=3, column=3)

e3 = Entry(root)
e3.grid(row=3, column=4)

e4 = Entry(root)
e4.grid(row=3, column=5)

e5 = Entry(root)
e5.grid(row=4, column=2)

e6 = Entry(root)
e6.grid(row=4, column=3)

e7 = Entry(root)
e7.grid(row=4, column=4)

e8 = Entry(root)
e8.grid(row=4, column=5)

buttonCheck = Button(root, text="Check", command=ex1).grid(row=5, column=3)

root.mainloop()
