import sys


def build(arr):
    seg = [arr]
    for i in range(len(arr)):
        seg += [[sum(seg[-1][j:j + 2]) for j in range(0, len(seg[-1]), 2)]]
        if len(seg[-1]) == 1:
            break
    return seg


def update(index, value):
    seg[0][index] = value
    for i in range(1, len(seg)):
        index //= 2
        seg[i][index] = sum(seg[i - 1][index * 2:index * 2 + 2])


def query(l, r):
    ans = seg[-1][0]
    i = 0
    while l and l % 2 == 0:
        l //= 2
        i += 1
    if l:
        l -= len(seg[i]) + 1
        ans -= seg[i][l]
        i += 1
        while i < len(seg) and (-l) <= len(seg[i]):
            ans -= seg[i][l]
            i += 1

    i = 0
    while r and r % 2 == 1:
        r //= 2
        i += 1
    if r % 2 == 0 and r + 1 < len(seg[i]):
        ans -= seg[i][r + 1]
        i += 1
        while i < len(seg) and r + 1 < len(seg[i]):
            ans -= seg[i][r + 1]
            i += 1

    return ans


arr = [3, 5, 6, 7, 8, 2, 4, 2, 1]

seg = build(arr)

print(*seg, sep='\n')

for s in sys.stdin:
    l, r = s.split()
    l = int(l) - 1
    r = int(r) - 1
    print(query(l, r))
